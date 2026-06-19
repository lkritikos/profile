import { profile } from '../data/profile.ts'

/**
 * About section — first-person prose drawn from the résumé, plus a tech-stack
 * chip row of core technologies.
 */
export function About() {
  return (
    <section id="about" className="section section--alt">
      <div className="container" data-reveal>
        <h2 className="section-title">About</h2>
        <p>
          I&rsquo;m a software engineer based in the {profile.location}, with nine
          years building and maintaining web and mobile applications. My focus is
          frontend architecture in React and TypeScript &mdash; and I&rsquo;m at my
          best where an established codebase needs to evolve without bringing
          feature work to a halt.
        </p>
        <p>
          At Pinnacol Assurance I worked on frontend modernization across several
          product lines: migrating JavaScript to TypeScript and class components to
          hooks, replacing Redux&nbsp;Sagas and Axios with RTK&nbsp;Query, and helping
          migrate a homegrown component library to MUI. I also built developer tooling
          &mdash; including a Docusaurus dependencies dashboard with npm-registry
          integration, peer-dependency analysis, and version tracking &mdash; and
          shipped features like a permissions-aware notifications center and claims
          filtering with URL-persisted state.
        </p>
        <p>
          Earlier, at Ryver and Defendry, I built the core UI for a collaborative web
          app and a cross-platform security app in React&nbsp;Native for iOS and
          Android. I hold a B.S. in Computer Science from Fordham University.
        </p>
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
