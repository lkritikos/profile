# Profile site

A single-page personal/developer profile for **Lia Kritikos**, built with Vite +
React 19 + TypeScript and deployed to **Cloudflare Workers** at
[profile.lkritikos.workers.dev](https://profile.lkritikos.workers.dev).

Light/dark theming (follows the system, with a persisted manual toggle) from a
typed design-token palette, an accessible teal accent (WCAG AA in both modes),
and a data-driven Projects section.

## Develop

```sh
pnpm install
pnpm dev          # local dev server with HMR
```

## Checks

```sh
pnpm lint         # ESLint
pnpm test         # Vitest (jsdom) + React Testing Library + axe
pnpm build        # tsc -b + vite build → dist/
```

## Deploy

CI deploys on merge to `main`. To deploy manually:

```sh
pnpm deploy       # build + wrangler deploy
```

## Add a project

Append one object to the `projects` array in
[`src/data/projects.ts`](src/data/projects.ts) — it renders as a card
automatically:

```ts
{
  title: 'Project name',
  description: 'One or two sentences.',
  link: 'https://…',          // optional
  tags: ['React', 'TypeScript'],
}
```

## More

See [`CLAUDE.md`](CLAUDE.md) for conventions: the theme token pipeline,
accessibility bar, testing approach, and privacy rules.
