import { describe, expect, it } from 'vitest';
import { buildThemeCss, cssVar, installTheme } from './createTheme.ts';
import { palettes } from './palette.ts';

describe('buildThemeCss', () => {
  it('emits a :root base, a dark media query, and an explicit data-theme override', () => {
    const css = buildThemeCss();
    expect(css).toContain(':root {');
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain('[data-theme="dark"]');
  });

  it('maps each palette role to its --token with the palette value', () => {
    const css = buildThemeCss();
    expect(css).toContain(`${cssVar.accent}: ${palettes.light.accent};`);
    expect(css).toContain(`${cssVar.bg}: ${palettes.dark.bg};`);
  });
});

describe('installTheme', () => {
  it('injects a single <style id="theme-vars"> (idempotent) with theme + type vars', () => {
    installTheme();
    installTheme(); // second call must refresh, not duplicate

    const styles = document.querySelectorAll('style#theme-vars');
    expect(styles).toHaveLength(1);
    expect(styles[0].textContent).toContain('--accent');
    expect(styles[0].textContent).toContain('--sans');
  });
});
