import { ThemeToggle } from './ThemeToggle.tsx'
import { profile } from '../data/profile.ts'

/**
 * Sticky banner: brand, in-page anchor links (smooth-scroll via CSS), and the
 * theme toggle. Full-bleed background; inner content is capped by `.container`.
 */
export function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#top">
          {profile.name}
        </a>
        <nav aria-label="Primary">
          <ul className="nav-links">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}
