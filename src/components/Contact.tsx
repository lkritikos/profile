import { profile } from '../data/profile.ts'

/**
 * Footer / contact section. Contact is links-only by design — no email, phone,
 * or X/Twitter. Repeats the GitHub + LinkedIn links from the hero.
 */
export function Contact() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <h2>Contact</h2>
        <p>The best ways to reach me:</p>
        <ul className="contact-links">
          <li>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
        <p className="footer-note">
          © {year} {profile.name} · {profile.location}
        </p>
      </div>
    </footer>
  )
}
