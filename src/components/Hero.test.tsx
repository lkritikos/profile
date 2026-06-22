import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Hero } from './Hero.tsx';
import { profile } from '../data/profile.ts';

describe('Hero', () => {
  it('renders the name as the page heading, plus the status pill, tagline, and intro', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getByText(profile.currently)).toBeInTheDocument();
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
    expect(screen.getByText(profile.intro)).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Hero />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
