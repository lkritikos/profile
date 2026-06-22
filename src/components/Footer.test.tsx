import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Footer } from './Footer.tsx';
import { profile } from '../data/profile.ts';

describe('Footer', () => {
  it('renders a contentinfo bar with the current year, name, and location', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(String(new Date().getFullYear()));
    expect(footer).toHaveTextContent(profile.name);
    expect(footer).toHaveTextContent(profile.location);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Footer />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
