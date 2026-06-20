import { afterEach, describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { setMatchMedia } from '../../vitest.setup.ts';
import { STORAGE_KEY, useTheme } from './useTheme.ts';

afterEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
  setMatchMedia(false); // reset OS preference to light
});

describe('useTheme', () => {
  it('defaults to the system preference when nothing is stored', () => {
    setMatchMedia(true); // OS prefers dark
    const { result } = renderHook(() => useTheme());

    expect(result.current.preference).toBe('system');
    expect(result.current.theme).toBe('dark');
    // 'system' must not pin an attribute — the CSS media query governs.
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('honors a stored explicit choice over the system preference', () => {
    setMatchMedia(true); // OS prefers dark...
    localStorage.setItem(STORAGE_KEY, 'light'); // ...but the user picked light
    const { result } = renderHook(() => useTheme());

    expect(result.current.preference).toBe('light');
    expect(result.current.theme).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggling sets and persists the opposite explicit choice', () => {
    const { result } = renderHook(() => useTheme()); // system = light
    act(() => result.current.toggle());

    expect(result.current.preference).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
  });

  it('useSystem() clears the explicit choice and follows the OS again', () => {
    localStorage.setItem(STORAGE_KEY, 'dark');
    const { result } = renderHook(() => useTheme());
    act(() => result.current.useSystem());

    expect(result.current.preference).toBe('system');
    expect(document.documentElement.hasAttribute('data-theme')).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
