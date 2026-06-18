import { profile } from '../data/profile.ts'

/**
 * About section — placeholder prose until the real resume copy lands in Step 6.
 */
export function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2>About</h2>
        <p>
          Software engineer based in the {profile.location}, with nine years
          building and modernizing web and mobile applications. Recent work spans
          large TypeScript/React migrations (JS&nbsp;→&nbsp;TS, class&nbsp;→&nbsp;hooks,
          Redux&nbsp;Sagas&nbsp;→&nbsp;RTK&nbsp;Query), developer tooling, and
          design-system work.
        </p>
        <p>This copy is a placeholder; the final About text lands in a later pass.</p>
      </div>
    </section>
  )
}
