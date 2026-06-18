import { profile } from '../data/profile.ts'

/**
 * About section — placeholder prose (finalized in Step 6) plus a tech-stack
 * chip row drawn from real resume skills, which gives the section substance now.
 */
export function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container">
        <h2 className="section-title">About</h2>
        <p>
          Software engineer based in the {profile.location}, with nine years
          building and modernizing web and mobile applications. Recent work spans
          large TypeScript/React migrations (JS&nbsp;→&nbsp;TS, class&nbsp;→&nbsp;hooks,
          Redux&nbsp;Sagas&nbsp;→&nbsp;RTK&nbsp;Query), developer tooling, and
          design-system work.
        </p>
        <p>This copy is a placeholder; the final About text lands in a later pass.</p>
        <ul className="chips" aria-label="Core technologies">
          {profile.tech.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
