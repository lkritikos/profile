import { profile } from '../data/profile.ts'

/**
 * Landing section: name, tagline, intro, the "Currently" pill, and the two
 * profile links (GitHub = primary/filled, LinkedIn = secondary/outlined).
 */
export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container">
        <p className="pill">{profile.currently}</p>
        <h1>{profile.name}</h1>
        <p className="hero-tagline">{profile.tagline}</p>
        <p className="hero-intro">{profile.intro}</p>
        <div className="hero-actions">
          <a
            className="btn btn-primary"
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="btn btn-outline"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
