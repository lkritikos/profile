// Trigger a per-branch preview deploy (preview.yml) for the current branch,
// wait for it to go live, then print + open the preview URL.
// Requires the GitHub CLI (`gh`) installed and authenticated.
import { execFileSync, spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const WORKER = 'profile';
const SUBDOMAIN = 'lkritikos'; // <subdomain>.workers.dev for this account

/** Branch name -> DNS-safe Cloudflare preview alias (lowercase, [a-z0-9-], <=63). */
export function sanitizeAlias(branch) {
  return branch
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 63)
    .replace(/-+$/, '');
}

/** Deterministic preview URL for an alias. */
export function previewUrl(alias) {
  return `https://${alias}-${WORKER}.${SUBDOMAIN}.workers.dev`;
}

/** Platform-appropriate command to open a URL in the default browser. */
export function opener(platform) {
  if (platform === 'darwin') return { cmd: 'open', args: [] };
  if (platform === 'win32') return { cmd: 'cmd', args: ['/c', 'start', ''] };
  return { cmd: 'xdg-open', args: [] };
}

/** Cyan + underline link when on a TTY and NO_COLOR is unset; plain otherwise. */
export function colorizeUrl(url, { isTTY, noColor }) {
  if (!isTTY || noColor) return url;
  return `\x1b[36m\x1b[4m${url}\x1b[0m`;
}

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim();
}

async function main() {
  const noOpen = process.argv.includes('--no-open');
  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  if (branch === 'main') {
    console.error('Refusing to preview `main` — merging to main already deploys production.');
    process.exit(1);
  }
  const alias = sanitizeAlias(branch);
  console.log(`Dispatching preview for "${branch}" (alias: ${alias})…`);

  try {
    execFileSync('gh', ['workflow', 'run', 'preview.yml', '--ref', branch], { stdio: 'inherit' });
  } catch {
    console.error('Dispatch failed. Is the branch pushed to origin and is `gh` authenticated?');
    process.exit(1);
  }

  // Find the run just created (brief retry for the dispatch->appear race).
  let runId = '';
  for (let i = 0; i < 10 && !runId; i++) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    runId = execFileSync('gh', ['run', 'list', '--workflow', 'preview.yml', '--branch', branch,
      '--limit', '1', '--json', 'databaseId', '--jq', '.[0].databaseId // empty'],
      { encoding: 'utf8' }).trim();
  }
  if (!runId) {
    console.error('Could not locate the dispatched run; check the Actions tab.');
    process.exit(1);
  }

  // Block until the run finishes; throws (non-zero) if the gate failed.
  try {
    execFileSync('gh', ['run', 'watch', runId, '--exit-status'], { stdio: 'inherit' });
  } catch {
    console.error('Preview build failed — no URL published.');
    process.exit(1);
  }

  const url = previewUrl(alias);
  const pretty = colorizeUrl(url, { isTTY: Boolean(process.stdout.isTTY), noColor: Boolean(process.env.NO_COLOR) });
  console.log(`\nPreview live: ${pretty}`);

  if (!noOpen) {
    const { cmd, args } = opener(process.platform);
    const child = spawn(cmd, [...args, url], { stdio: 'ignore', detached: true });
    child.on('error', () => {}); // best-effort: no opener available, never fail
    child.unref();
  }
}

// Only run when invoked directly (not when imported by the test).
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
