import { useState } from 'react'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="brand">
            <img
              src="https://res.cloudinary.com/dy8oze8dn/image/upload/v1768744961/logo-favicon_ntxcz2.png"
              alt="Hogben Solutions Logo"
              className="logo"
            />
            <span className="brand-name">Hogben Solutions</span>
          </div>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <a href="#contact" className="btn accent">
              Let's Talk
            </a>
          </div>

          <button
            className={`menu-toggle ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  )
}
