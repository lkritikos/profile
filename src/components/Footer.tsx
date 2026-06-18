import { profile } from '../data/profile.ts'

/**
 * Minimal footer bar. Social links live in the sticky header, so the footer is
 * deliberately a single line: copyright, location, and the stack it's built on.
 */
export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          © {year} {profile.name}
        </span>
        <span className="footer-meta">
          {profile.location} · Built with React + Cloudflare Workers
        </span>
      </div>
    </footer>
  )
}
