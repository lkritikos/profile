import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { ProjectCard } from './ProjectCard.tsx';
import type { Project } from '../data/projects.ts';

const linked: Project = {
  title: 'This site',
  description: 'A personal profile built on the edge.',
  link: 'https://github.com/lkritikos/profile',
  tags: ['React', 'TypeScript'],
};

describe('ProjectCard', () => {
  it('renders a linked card as an external link with the new-tab affordance', () => {
    render(<ProjectCard project={linked} />);

    const link = screen.getByRole('link', { name: /this site/i });
    expect(link).toHaveAttribute('href', linked.link);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    // SR-only cue that the link opens a new tab.
    expect(link).toHaveAccessibleName(/opens in new tab/i);
  });

  it('renders each tag as a chip', () => {
    render(<ProjectCard project={linked} />);

    const chips = screen.getByRole('list', { name: /this site tags/i });
    expect(within(chips).getAllByRole('listitem')).toHaveLength(linked.tags.length);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders an unlinked card as plain text with no link', () => {
    const { container } = render(
      <ProjectCard project={{ ...linked, link: undefined }} />,
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('This site')).toBeInTheDocument();
    // The corner arrow is only an affordance for linked cards.
    expect(container.querySelector('.project-card-arrow')).toBeNull();
  });
});
