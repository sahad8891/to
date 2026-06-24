import { useState, useEffect } from 'react'
import { Link } from 'react-router'

// Responsive Navbar using UI system classes from src/styles/ui.css
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState('system')

  // Initialize theme from localStorage (if present)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') {
        document.documentElement.classList.add('dark-mode')
        setTheme('dark')
      } else if (saved === 'light') {
        document.documentElement.classList.remove('dark-mode')
        setTheme('light')
      } else {
        setTheme('system')
      }
    } catch (err) {
      console.error('Failed to initialize theme:', err)
    }
  }, [])

  const toggleTheme = () => {
    try {
      const isDark = document.documentElement.classList.toggle('dark-mode')
      const newTheme = isDark ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      setTheme(newTheme)
    } catch (err) {
      console.error('Failed to toggle theme:', err)
    }
  }

  return (
    <nav className="ui-nav" role="navigation" aria-label="Main navigation">
      <div className="ui-container" style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <div className="brand">
          <Link to="/" aria-label="Home" style={{textDecoration:'none'}}>
            <h1>TodoApp</h1>
          </Link>
        </div>

        <div className="nav-links" data-open={open}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/counter" className="nav-link">Counter</Link>
        </div>

        <div className="stack" style={{alignItems:'center', gap:8}}>
          <button
            className="btn btn-sm btn-ghost"
            aria-pressed={theme === 'dark'}
            aria-label="Toggle color theme"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          <button className="nav-toggle btn btn-ghost" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </nav>
  )
}
