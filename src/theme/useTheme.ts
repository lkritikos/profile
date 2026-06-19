/**
 * Theme preference hook.
 *
 * Model: the user has a *preference* of 'system' | 'light' | 'dark'.
 *  - 'system' (the default, when nothing is stored): no `data-theme` attribute,
 *    so the `prefers-color-scheme` rules from createTheme.ts govern, and the
 *    theme tracks the OS live.
 *  - 'light'/'dark': an explicit choice, persisted in localStorage and written
 *    to `<html data-theme>` so it overrides the OS setting.
 *
 * The toggle is a simple two-state switch: clicking always sets an explicit
 * choice opposite to whatever is showing now. The no-flash script in
 * index.html applies a stored choice before first paint.
 */

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
type Preference = Theme | 'system';

export const STORAGE_KEY = 'theme';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readPreference(): Preference {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'light' || stored === 'dark' ? stored : 'system';
}

function applyPreference(pref: Preference): void {
  const root = document.documentElement;
  if (pref === 'system') {
    root.removeAttribute('data-theme');
    localStorage.removeItem(STORAGE_KEY);
  } else {
    root.setAttribute('data-theme', pref);
    localStorage.setItem(STORAGE_KEY, pref);
  }
}

export function useTheme() {
  const [preference, setPreference] = useState<Preference>(readPreference);
  const [system, setSystem] = useState<Theme>(systemTheme);

  // Track OS changes so the icon stays correct while preference is 'system'.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setSystem(mq.matches ? 'dark' : 'light');
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Reflect the preference onto <html> + storage whenever it changes.
  useEffect(() => {
    applyPreference(preference);
  }, [preference]);

  const theme: Theme = preference === 'system' ? system : preference;

  const toggle = useCallback(() => {
    setPreference(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  /** Clear the explicit choice and follow the OS again. */
  const useSystem = useCallback(() => setPreference('system'), []);

  return { theme, preference, toggle, useSystem };
}
