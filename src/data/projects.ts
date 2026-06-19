/**
 * Projects shown in the Projects section.
 *
 * Adding a project is a one-object append: drop a new entry into the array
 * below and it renders as a card automatically (no component changes). The
 * array is intentionally empty for now — the section shows a friendly empty
 * state until the first project lands.
 */

export type Project = {
  /** Card heading. */
  title: string
  /** One- or two-sentence summary. */
  description: string
  /** Optional outbound link (repo, demo, write-up); omit if none yet. */
  link?: string
  /** Short tech/topic tags, rendered as chips. */
  tags: readonly string[]
}

export const projects: readonly Project[] = [
  {
    title: 'This site',
    description:
      'The site you’re reading. Built with React 19 and TypeScript on a typed ' +
      'design-token theme system with light/dark support, and deployed to the edge ' +
      'on Cloudflare Workers. Source is on GitHub.',
    link: 'https://github.com/lkritikos/profile',
    tags: ['React', 'TypeScript', 'Cloudflare Workers', 'Vite'],
  },
]
