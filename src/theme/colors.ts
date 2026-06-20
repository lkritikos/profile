/**
 * Primitive color scales — raw values with NO semantic meaning.
 *
 * This is the lowest layer of the theme: just named color stops (like a
 * crayon box). `palette.ts` maps these onto semantic roles (text, accent, …),
 * so a given stop can be reused across roles without duplicating hex values.
 *
 *   colors.ts  (raw scales)  →  palette.ts  (semantic roles)  →  createTheme.ts  (CSS vars)
 */

/** Teal — the brand accent scale (50 = lightest, 950 = darkest). */
export const teal = {
  50: '#effcf9',
  100: '#c9f5ec',
  200: '#97e9da',
  300: '#5eead4',
  400: '#2dd4bf',
  500: '#14b8a6',
  600: '#0d9488',
  700: '#0f766e',
  800: '#115e59',
  900: '#134e4a',
  950: '#042f2e',
} as const;

/** Slate — teal-tinted neutrals for text, surfaces, and borders. */
export const slate = {
  0: '#ffffff',
  50: '#f3f7f6',
  100: '#e7eeec',
  200: '#d6e1df',
  300: '#c3d2cf',
  400: '#8ba29d',
  500: '#5a6f70',
  600: '#33474a',
  700: '#213330',
  800: '#131e1c',
  900: '#0c1413',
} as const;

export const black = '#000000';

/** Return an `rgba()` string for a `#rrggbb` hex at the given alpha (0–1). */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
