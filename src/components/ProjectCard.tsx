import type { Project } from '../data/projects.ts'

/**
 * A single project as a card: title, description, and tag chips reusing the
 * shared `.chip` style. When `link` is set the title becomes a link whose
 * hit-area is stretched over the whole card (`::after` in CSS), and a corner
 * arrow signals that the card opens externally.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { title, description, link, tags } = project
  return (
    <article className="card project-card">
      {link && <ArrowIcon />}
      <h3 className="project-card-title">
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="project-card-desc">{description}</p>
      {tags.length > 0 && (
        <ul className="chips" aria-label={`${title} tags`}>
          {tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

/** Decorative corner affordance for linked cards; the link carries the name. */
function ArrowIcon() {
  return (
    <svg
      className="project-card-arrow"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  )
}
