import './App.css'
import { Nav } from './components/Nav.tsx'
import { Hero } from './components/Hero.tsx'
import { About } from './components/About.tsx'
import { Projects } from './components/Projects.tsx'
import { Footer } from './components/Footer.tsx'

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
      <Footer />
    </>
  )
}

export default App
