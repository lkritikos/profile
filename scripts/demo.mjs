// Trigger a per-branch preview deploy (preview.yml) for the current branch,
// wait for it to go live, then print + open the preview URL.
// Requires the GitHub CLI (`gh`) installed and authenticated.
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
