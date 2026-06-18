/**
 * Theme palette — the single source of truth for every color on the site.
 *
 * Each role below maps to a raw stop from the primitive scales in `colors.ts`
 * (with alpha tints via `alpha()`). `createTheme.ts` then compiles these into
 * CSS custom properties. Component/global styles only ever reference the
 * resulting CSS variables (e.g. `var(--accent)`), never raw hex — so
 * re-theming means editing the scales and this mapping, nothing else.
 *
 * Accent is teal in both modes (a deeper teal in light, a bolder/brighter
 * teal in dark). Values are tuned for WCAG AA contrast (≥ 4.5:1 for body text
 * and links against their background); a final contrast pass happens in Step 6.
 */

import { alpha, black, slate, teal } from './colors.ts'

export type ThemeName = 'light' | 'dark'

export interface Palette {
  /** Body text. */
  text: string
  /** High-emphasis text: headings, hovered links. */
  textStrong: string
  /** Secondary/muted text: captions, metadata. */
  textMuted: string
  /** Page background. */
  bg: string
  /** Raised surfaces: cards, the sticky nav. */
  surface: string
  /** Hairline borders and dividers. */
  border: string
  /** Teal accent: links, primary actions. */
  accent: string
  /** Accent for hover/active states. */
  accentStrong: string
  /** Readable text/icon color when placed on an `accent` fill. */
  onAccent: string
  /** Subtle accent tint for backgrounds (e.g. the "Currently" pill). */
  accentSoft: string
  /** Accent-tinted border. */
  accentBorder: string
  /** Keyboard focus ring color. */
  focusRing: string
  /** Box-shadow stack for raised surfaces. */
  shadow: string
  /** Inline `code` background. */
  codeBg: string
}

export const palettes: Record<ThemeName, Palette> = {
  light: {
    text: slate[600],
    textStrong: slate[900],
    textMuted: slate[500],
    bg: slate[0],
    surface: slate[50],
    border: slate[200],
    accent: teal[700],
    accentStrong: teal[800],
    onAccent: slate[0],
    accentSoft: alpha(teal[700], 0.1),
    accentBorder: alpha(teal[700], 0.4),
    focusRing: teal[700],
    shadow: `${alpha(slate[900], 0.1)} 0 10px 15px -3px, ${alpha(slate[900], 0.05)} 0 4px 6px -2px`,
    codeBg: slate[100],
  },
  dark: {
    text: slate[300],
    textStrong: slate[50],
    textMuted: slate[400],
    bg: slate[900],
    surface: slate[800],
    border: slate[700],
    accent: teal[400],
    accentStrong: teal[300],
    onAccent: teal[950],
    accentSoft: alpha(teal[400], 0.14),
    accentBorder: alpha(teal[400], 0.45),
    focusRing: teal[400],
    shadow: `${alpha(black, 0.45)} 0 10px 15px -3px, ${alpha(black, 0.3)} 0 4px 6px -2px`,
    codeBg: slate[800],
  },
}
