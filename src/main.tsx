import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { installTheme } from './theme/createTheme.ts'
import App from './App.tsx'

// Compile the typed palette + typography into CSS variables before first paint.
installTheme()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
