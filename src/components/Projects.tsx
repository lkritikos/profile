import { projects } from '../data/projects.ts'
import { ProjectCard } from './ProjectCard.tsx'

/**
 * Projects section — data-driven from `src/data/projects.ts`. A populated
 * array renders a responsive card grid; an empty array shows a friendly,
 * intentional empty state so the section never looks broken. Adding a project
 * is a one-object append to the data file.
 */
export function Projects() {
  const hasProjects = projects.length > 0
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        {hasProjects ? (
          <ul className="project-grid" aria-label="Projects">
            {projects.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="project-empty">
            <p className="project-empty-lead">A few things are in the works.</p>
            <p className="muted">
              Selected projects will land here soon. In the meantime, my work
              lives on GitHub.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
