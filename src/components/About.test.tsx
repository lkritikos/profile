import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { About } from './About.tsx';
import { profile } from '../data/profile.ts';

describe('About', () => {
  it('renders the section heading and one chip per core technology', () => {
    render(<About />);
    expect(screen.getByRole('heading', { level: 2, name: /about/i })).toBeInTheDocument();
    const chips = screen.getByRole('list', { name: /core technologies/i });
    expect(within(chips).getAllByRole('listitem')).toHaveLength(profile.tech.length);
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<About />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
