import './App.css'
import { Nav } from './components/Nav.tsx'
import { Hero } from './components/Hero.tsx'
import { About } from './components/About.tsx'
import { Projects } from './components/Projects.tsx'
import { Contact } from './components/Contact.tsx'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
      </main>
      <Contact />
    </>
  )
}

export default App
