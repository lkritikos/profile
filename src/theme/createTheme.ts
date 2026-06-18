/**
 * Theme builder — compiles the typed {@link palettes} into CSS custom
 * properties and installs them on the document.
 *
 * This is the bridge between the TS palette (single source of truth) and the
 * stylesheet that the rest of the app reads via `var(--token)`. It emits:
 *   - `:root`                      → light theme (the default)
 *   - `@media (prefers-color-scheme: dark)` → dark theme when the OS prefers it
 *     and the user hasn't made an explicit choice
 *   - `:root[data-theme="dark|light"]`      → an explicit user override
 *     (wired up by the toggle in Step 2)
 */

import type { Palette } from './palette.ts'
import { palettes } from './palette.ts'
import type { Typography } from './typography.ts'
import { typography } from './typography.ts'

/** Maps each palette key to the CSS custom-property name it compiles to. */
export const cssVar = {
  text: '--text',
  textStrong: '--text-strong',
  textMuted: '--text-muted',
  bg: '--bg',
  surface: '--surface',
  border: '--border',
  accent: '--accent',
  accentStrong: '--accent-strong',
  onAccent: '--on-accent',
  accentSoft: '--accent-soft',
  accentBorder: '--accent-border',
  focusRing: '--focus-ring',
  shadow: '--shadow',
  codeBg: '--code-bg',
} satisfies Record<keyof Palette, string>

const paletteKeys = Object.keys(cssVar) as (keyof Palette)[]

/** Render a palette as `--token: value;` declaration lines. */
function declarations(palette: Palette): string {
  return paletteKeys
    .map((key) => `  ${cssVar[key]}: ${palette[key]};`)
    .join('\n')
}

/**
 * Build the full theme stylesheet from a set of palettes.
 * Light is the base; dark applies via the media query unless the user has
 * explicitly chosen light; explicit `data-theme` choices always win.
 */
export function buildThemeCss(themes: Record<'light' | 'dark', Palette> = palettes): string {
  const light = declarations(themes.light)
  const dark = declarations(themes.dark)
  return [
    `:root {\n${light}\n}`,
    `@media (prefers-color-scheme: dark) {\n  :root:not([data-theme="light"]) {\n${dark}\n  }\n}`,
    `:root[data-theme="light"] {\n${light}\n}`,
    `:root[data-theme="dark"] {\n${dark}\n}`,
  ].join('\n\n')
}

/**
 * Render the typography tokens as `:root` declarations. Static (no light/dark
 * variation), so it compiles to a single block. Emits family vars (`--sans`,
 * `--heading`, `--mono`) plus, per scale role, `--fs-/--fw-/--lh-/--ls-<role>`.
 */
export function buildTypographyCss(type: Typography = typography): string {
  const lines = [
    `  --sans: ${type.fonts.sans};`,
    `  --heading: ${type.fonts.heading};`,
    `  --mono: ${type.fonts.mono};`,
  ]
  for (const [role, style] of Object.entries(type.scale)) {
    lines.push(`  --fs-${role}: ${style.size};`)
    if (style.weight != null) lines.push(`  --fw-${role}: ${style.weight};`)
    if (style.leading != null) lines.push(`  --lh-${role}: ${style.leading};`)
    if (style.tracking != null) lines.push(`  --ls-${role}: ${style.tracking};`)
  }
  return `:root {\n${lines.join('\n')}\n}`
}

const STYLE_ID = 'theme-vars'

/**
 * Install (or refresh) the theme CSS variables in `<head>`. Idempotent — safe
 * to call on startup and again if the palette ever changes at runtime.
 */
export function installTheme(themes: Record<'light' | 'dark', Palette> = palettes): void {
  if (typeof document === 'undefined') return
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = STYLE_ID
    document.head.appendChild(style)
  }
  style.textContent = [buildTypographyCss(), buildThemeCss(themes)].join('\n\n')
}
