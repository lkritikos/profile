import { ThemeToggle } from './ThemeToggle.tsx'
import { GitHubIcon, LinkedInIcon } from './icons.tsx'
import { profile, initials } from '../data/profile.ts'

/**
 * Sticky banner: monogram brand, in-page anchor links, and the right cluster
 * (GitHub/LinkedIn + theme toggle). The header is the single, always-visible
 * home for the social links — so they're not repeated in the hero or footer.
 */
export function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#top" aria-label={`${profile.name} — home`}>
          <span className="monogram" aria-hidden="true">
            {initials}
          </span>
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
          </ul>
        </nav>
        <div className="nav-actions">
          <a
            className="nav-icon"
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in new tab)"
          >
            <GitHubIcon />
          </a>
          <a
            className="nav-icon"
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn (opens in new tab)"
          >
            <LinkedInIcon />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
