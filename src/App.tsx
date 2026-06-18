import './App.css'
import { ThemeToggle } from './components/ThemeToggle.tsx'

// NOTE: temporary preview shell for Step 2 — lets us verify the teal theme and
// the light/dark toggle. Replaced by the real Nav + sections in Step 3.
function App() {
  return (
    <>
      <header className="topbar">
        <span className="brand">Lia Kritikos</span>
        <ThemeToggle />
      </header>
      <main className="demo">
        <h1>Theme preview</h1>
        <p>
          Temporary preview to verify the teal theme and the light/dark toggle.
          Use the button in the top-right, then reload — your choice should
          stick. Clearing the <code>theme</code> key in localStorage returns to
          following your OS setting.
        </p>
        <p>
          A link uses the accent color: <a href="#preview">accent link</a>.
        </p>
        <div className="demo-buttons">
          <button type="button" className="btn btn-primary">
            Primary action
          </button>
          <button type="button" className="btn btn-outline">
            Secondary action
          </button>
        </div>
      </main>
    </>
  )
}

export default App
