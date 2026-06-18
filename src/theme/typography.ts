/**
 * Typography tokens — the single source of truth for type on the site.
 *
 * Like {@link palettes} for color, this typed object is compiled into CSS
 * custom properties by `createTheme.ts` and injected at startup; component and
 * global styles read the resulting vars (`var(--heading)`, `var(--fs-h1)`, …),
 * never raw font strings or sizes. Unlike the palette there is no light/dark
 * variation, so it compiles to a single `:root` block.
 *
 * Sizes use `clamp()` so type is fluid between mobile and desktop — no
 * per-breakpoint font-size overrides needed.
 *
 * Pairing (Step 3): Space Grotesk (headings) · Inter (body) · JetBrains Mono
 * (small UI labels — the pill, chips, footer). All three are loaded in
 * index.html and chosen for legibility / WCAG-friendly letterforms.
 */

export interface TypeStyle {
  /** font-size (use clamp() for fluid scaling). */
  size: string
  /** font-weight. */
  weight?: number
  /** line-height (unitless ratio). */
  leading?: string
  /** letter-spacing. */
  tracking?: string
}

export interface Typography {
  fonts: {
    sans: string
    heading: string
    mono: string
  }
  scale: Record<'h1' | 'h2' | 'body' | 'label', TypeStyle>
}

export const typography: Typography = {
  fonts: {
    sans: "'Inter', system-ui, 'Segoe UI', Roboto, sans-serif",
    heading: "'Space Grotesk', system-ui, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, Consolas, monospace",
  },
  scale: {
    h1: {
      size: 'clamp(2.25rem, 1.5rem + 3.2vw, 3.5rem)',
      weight: 600,
      leading: '1.04',
      tracking: '-0.02em',
    },
    h2: {
      size: 'clamp(1.3125rem, 1.15rem + 0.7vw, 1.625rem)',
      weight: 600,
      leading: '1.2',
      tracking: '-0.01em',
    },
    body: {
      size: 'clamp(1rem, 0.95rem + 0.25vw, 1.125rem)',
      weight: 400,
      leading: '1.6',
      tracking: '0.01em',
    },
    label: {
      size: '0.8125rem',
      weight: 500,
      leading: '1.4',
      tracking: '0.01em',
    },
  },
}
