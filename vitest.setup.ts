/**
 * Vitest global setup (referenced from vite.config.ts `test.setupFiles`).
 *
 * - Registers jest-dom + vitest-axe matchers on vitest's `expect`.
 * - Cleans up the RTL DOM after each test (auto-cleanup only fires with
 *   `globals: true`, and we run with explicit imports).
 * - Polyfills `window.matchMedia`, which jsdom does not implement but
 *   `useTheme` relies on. Defaults to light; `setMatchMedia()` lets a test
 *   simulate a dark OS preference.
 */
import { afterEach, expect } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import * as axeMatchers from 'vitest-axe/matchers';

// Matcher types are augmented in src/vitest-axe.d.ts (vitest-axe's own
// extend-expect targets the legacy Vi namespace that Vitest 4 removed).
expect.extend(axeMatchers);

afterEach(() => {
  cleanup();
});

/** Install a `matchMedia` stub; `dark` controls the prefers-color-scheme result. */
export function setMatchMedia(dark: boolean): void {
  window.matchMedia = (query: string) => ({
    matches: query.includes('dark') ? dark : !dark,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

setMatchMedia(false);

// axe-core's color-contrast rule probes <canvas>, which jsdom can't render
// (it would emit a "getContext not implemented" warning and the rule no-ops
// anyway). Stub it to keep test output clean.
HTMLCanvasElement.prototype.getContext = () => null;

