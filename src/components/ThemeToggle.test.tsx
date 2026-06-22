import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle.tsx';

// useTheme reads localStorage + the matchMedia stub (light by default, set in
// vitest.setup.ts) and writes data-theme on <html>; reset both around each test.
function reset() {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
}

describe('ThemeToggle', () => {
  beforeEach(reset);
  afterEach(reset);

  it('labels itself by the theme it will switch to (system default is light → "dark")', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeInTheDocument();
  });

  it('toggles to dark on click: flips the label and persists the explicit choice', async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole('button', { name: /switch to dark theme/i }));

    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
