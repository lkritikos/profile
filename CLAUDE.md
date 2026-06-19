# CLAUDE.md

Guidance for working in this repo. It's a single-page personal profile site for
Lia Kritikos, deployed to Cloudflare Workers. Keep it fast, lean, and accessible.

## Stack & commands

- **Vite + React 19 + TypeScript**, package manager **pnpm**. No runtime UI deps
  (no MUI, no router) — see _Dependency-light_ below.
- `pnpm dev` — local dev server (HMR).
- `pnpm lint` — ESLint (flat config). Must pass.
- `pnpm test` — Vitest run (jsdom). `pnpm test:watch` for watch mode.
- `pnpm build` — `tsc -b` (typecheck) then `vite build` → `dist/`.
- `pnpm deploy` — `pnpm build` then `wrangler deploy` (manual deploy; CI also
  deploys on merge to `main`).

Always-green bar before pushing: **lint + tsc + test + build**.

## Code style

- **Always use semicolons.** Enforced by `@stylistic/semi: ['error', 'always']`
  in `eslint.config.js`; run `eslint --fix` rather than hand-managing them.
- Style everything through theme tokens (`var(--token)`), never hardcoded
  hex/font values — see _Theme_.

## Structure

- Entry: `src/main.tsx` calls `installTheme()` (compiles the palette to CSS vars
  before paint), then renders `src/App.tsx`.
- `App.tsx` composes the page: skip-link → `Nav` → `main` (`Hero`, `About`,
  `Projects`) → `Footer`.
- Section components live in `src/components/`. New sections go there and get
  composed in `App.tsx`. Shared facts (name, links, location, tech, copy) live in
  `src/data/profile.ts`.

## Theme

Single source of truth is TypeScript; CSS variables are generated from it.

- `src/theme/colors.ts` — raw teal + slate scales (+ `alpha()`).
- `src/theme/palette.ts` — semantic roles (`text`, `bg`, `surface`, `accent`, …)
  mapped onto the scales, for `light` and `dark`.
- `src/theme/typography.ts` — typed font families + a fluid `clamp()` type scale.
- `src/theme/createTheme.ts` — compiles palette + typography into CSS custom
  properties and injects `<style id="theme-vars">`. `cssVar` maps each palette key
  to its `--token` name.
- **Light/dark:** light is the base; dark applies via `prefers-color-scheme`
  unless the user set an explicit choice. `src/theme/useTheme.ts` persists an
  explicit choice in `localStorage` (key `theme`) and writes `data-theme` on
  `<html>` to override the OS; clearing it falls back to system. A no-flash script
  in `index.html` applies the stored choice before first paint.
- **Contrast:** every token pair must meet **WCAG AA** in both themes.

## Adding a project

Append one typed object to the `projects` array in `src/data/projects.ts`:

```ts
{
  title: 'Project name',
  description: 'One or two sentences.',
  link: 'https://…', // optional — omit if there's no public URL yet
  tags: ['React', 'TypeScript'],
}
```

It renders as a card automatically (no component changes). An empty array shows
the intentional empty state.

## Testing

- **Vitest + React Testing Library**, jsdom environment, config in
  `vite.config.ts` (`test` block) with `vitest.setup.ts` for matchers/cleanup.
- Test **behavior and accessibility**, not implementation. Co-locate as
  `*.test.ts(x)` next to the unit.
- **`vitest-axe` must stay green** — every section should pass a no-violations
  check. (`src/vitest-axe.d.ts` types the matcher for Vitest 4.)
- Playwright is reserved for future E2E; not set up yet.

## Accessibility bar (standing requirement)

- AA contrast in both themes.
- Semantic landmarks (`header`/`nav`/`main`/`footer`) + a skip-to-content link.
- Honor `prefers-reduced-motion` (CSS and JS).
- Visible `:focus-visible` styling on all interactive elements.
- External links announce "(opens in new tab)" to screen readers.
- Keep `vitest-axe` passing.

## Privacy / PII

The site is deliberately low-exposure. **Do not add PII** in future edits:

- No phone number, no email (contact is **links only**: GitHub + LinkedIn).
- Location is the metro **"Atlanta, GA area"** only — never a precise street/city.
- **No X/Twitter** anywhere (no link, no Twitter Card meta).

## Deploy / CI

- Branch → PR → CI runs lint + test + build as required checks → squash-merge to
  `main` → CI deploys via `wrangler deploy`. Cloudflare credentials live as GitHub
  repo secrets.
- `pnpm deploy` is the manual fallback.
- `wrangler.jsonc` serves `dist/` as a single-page app on Workers.

## Analytics

Cloudflare Web Analytics (cookieless) — the beacon snippet + site token live in
`index.html`. The token is public by design.

## Dependency-light constraint

Don't add heavy runtime deps (MUI, a router, state libs, etc.) without a real
reason. The site is meant to stay fast and lean on the edge. Test/build tooling
is dev-only.

## Future routing

The page is sections, not routes. If content grows enough to want dedicated pages
(e.g. `/projects`), introduce React Router then — sections are already
componentized, so the lift is small. Until then a router is premature.

## Working style

Be **opinionated**. Voice disagreement, push back when something isn't quite
right, and offer alternatives rather than just complying — the site owner
explicitly asked for this.
