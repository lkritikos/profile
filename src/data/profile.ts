/**
 * Profile facts shared across sections (hero, contact, meta).
 *
 * Contact is links-only by decision: GitHub + LinkedIn, no email/phone, no
 * X/Twitter. Location is the metro ("Atlanta, GA area"), never a precise city.
 * Hero/About prose is filled with real resume copy in Step 6; the strings here
 * are deliberate placeholders until then.
 */

export const profile = {
  name: 'Lia Kritikos',
  role: 'Software Engineer',
  location: 'Atlanta, GA area',
  /** Short status shown in the hero "Currently" pill. */
  currently: 'Currently focused on TypeScript & React',
  /** One-line tagline under the name. */
  tagline: 'Frontend software engineer specializing in TypeScript & React.',
  /** Hero intro paragraph (placeholder until Step 6). */
  intro:
    'Nine years building and modernizing web and mobile apps — TypeScript, React, ' +
    'developer tooling, and design systems. (Intro copy finalized in a later pass.)',
  links: {
    github: 'https://github.com/lkritikos',
    linkedin: 'https://linkedin.com/in/lkritikos',
  },
} as const
