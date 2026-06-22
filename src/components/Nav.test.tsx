import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Nav } from './Nav.tsx';
import { profile } from '../data/profile.ts';

describe('Nav', () => {
  it('renders the banner with the primary in-page links', () => {
    render(<Nav />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects');
  });

  it('exposes the social links as new-tab external links', () => {
    render(<Nav />);
    const github = screen.getByRole('link', { name: /github \(opens in new tab\)/i });
    expect(github).toHaveAttribute('href', profile.links.github);
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', expect.stringContaining('noopener'));
    expect(
      screen.getByRole('link', { name: /linkedin \(opens in new tab\)/i }),
    ).toHaveAttribute('href', profile.links.linkedin);
  });

  it('includes the theme toggle', () => {
    render(<Nav />);
    expect(screen.getByRole('button', { name: /switch to .* theme/i })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Nav />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
