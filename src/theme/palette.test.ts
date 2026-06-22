import { describe, expect, it } from 'vitest';
import { palettes, type Palette, type ThemeName } from './palette.ts';

// Minimal WCAG relative-luminance + contrast-ratio for #rrggbb colors, so the
// "AA contrast in both themes" promise is enforced, not just asserted in prose.
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const channels = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const AA = 4.5; // WCAG AA for normal-size text/icons.

// Foreground/background pairs that actually carry text or icons on the site.
const pairs: Array<[keyof Palette, keyof Palette]> = [
  ['text', 'bg'],
  ['text', 'surface'],
  ['textStrong', 'bg'],
  ['textStrong', 'surface'],
  ['textMuted', 'bg'],
  ['accent', 'bg'], // links on the page background
  ['onAccent', 'accent'], // text/icon sitting on an accent fill
];

describe.each(['light', 'dark'] as ThemeName[])('%s palette meets WCAG AA', (name) => {
  const p = palettes[name];
  it.each(pairs)('%s on %s is at least 4.5:1', (fg, bg) => {
    expect(contrast(p[fg], p[bg])).toBeGreaterThanOrEqual(AA);
  });
});
