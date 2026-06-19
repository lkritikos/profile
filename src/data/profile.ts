/**
 * Profile facts shared across sections (hero, contact, meta).
 *
 * Contact is links-only by decision: GitHub + LinkedIn, no email/phone, no
 * X/Twitter. Location is the metro ("Atlanta, GA area"), never a precise city.
 *
 * `currently` is an availability signal — update this one string when the job
 * search status changes (e.g. to a current focus once a role is landed).
 */

export const profile = {
  name: 'Lia Kritikos',
  role: 'Software Engineer',
  location: 'Atlanta, GA area',
  /** Status shown in the hero pill. Availability signal — edit when it changes. */
  currently: 'Open to new frontend roles',
  /** One-line tagline under the name. */
  tagline:
    'Frontend engineer specializing in TypeScript, React, and modernizing large codebases.',
  /** Hero intro paragraph. */
  intro:
    "I'm a software engineer focused on frontend architecture, with nine years " +
    'building and modernizing web and mobile apps. Lately that has meant moving ' +
    'large React codebases forward — TypeScript migrations, replacing legacy state ' +
    'management, and the developer tooling and design systems that keep teams productive.',
  links: {
    github: 'https://github.com/lkritikos',
    linkedin: 'https://linkedin.com/in/lkritikos',
  },
  /** Headline tech, shown as chips in About. Drawn from real resume skills. */
  tech: [
    'TypeScript',
    'React',
    'React Native',
    'RTK Query',
    'React Hook Form',
    'MUI',
    'Vite',
  ],
} as const

/** Monogram initials (e.g. "LK") for the nav/footer brand mark + favicon. */
export const initials = profile.name
  .split(' ')
  .map((word) => word[0])
  .join('')
