import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import App from './App.tsx';

describe('App', () => {
  it('composes the page: skip link, landmarks, and the name heading', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /skip to content/i })).toHaveAttribute(
      'href',
      '#main',
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('has no accessibility violations across the whole page', async () => {
    const { container } = render(<App />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
