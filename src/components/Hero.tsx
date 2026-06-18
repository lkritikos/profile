import { profile } from '../data/profile.ts'

/**
 * Landing section: name, tagline, intro, and the "Currently" status pill.
 * Social links live in the sticky header (always visible), so the hero stays
 * clean text — in line with current minimalist portfolio practice.
 */
export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container">
        <p className="pill" data-reveal>
          {profile.currently}
        </p>
        <h1 data-reveal>{profile.name}</h1>
        <p className="hero-tagline" data-reveal>
          {profile.tagline}
        </p>
        <p className="hero-intro" data-reveal>
          {profile.intro}
        </p>
      </div>
    </section>
  )
}
