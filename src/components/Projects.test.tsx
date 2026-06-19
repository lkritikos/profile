import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'

// Each block re-imports Projects after configuring the data mock, so the two
// states (populated vs. empty) are exercised against the same component.
afterEach(() => {
  vi.resetModules()
  vi.doUnmock('../data/projects.ts')
})

describe('Projects (populated)', () => {
  it('renders a card per project from the data file', async () => {
    const { Projects } = await import('./Projects.tsx')
    render(<Projects />)

    // The real data file ships one card ("This site").
    expect(screen.getByRole('link', { name: /this site/i })).toBeInTheDocument()
    expect(screen.queryByText(/in the works/i)).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { Projects } = await import('./Projects.tsx')
    const { container } = render(<Projects />)

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('Projects (empty)', () => {
  it('shows the intentional empty state when no projects exist', async () => {
    vi.doMock('../data/projects.ts', () => ({ projects: [] }))
    const { Projects } = await import('./Projects.tsx')
    render(<Projects />)

    expect(screen.getByText(/a few things are in the works/i)).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
