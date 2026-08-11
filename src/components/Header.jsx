import { useState } from 'react'
import { Link } from 'react-router-dom'
import content from '../lib/content.js'
import logo from '../assets/logo.png'
import { analytics } from '../lib/analytics.js'

export default function Header() {
  const { name, tagline, nav = [], cta, ctaLink } = content.site
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-left">
          <button
            type="button"
            className={`nav-toggle ${menuOpen ? 'nav-toggle-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt={`${name} logo`} />
            <span>
              <span className="brand-name" style={{ display: 'block' }}>
                {name}
              </span>
              <span className="brand-tagline">{tagline}</span>
            </span>
          </Link>
        </div>
        <nav className="nav">
          <div id="nav-links" className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
            {nav.map((item) => (
              <Link key={item.url} to={item.url} className="nav-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <a
            href={ctaLink}
            target="_blank"
            rel="noreferrer"
            className="btn"
            onClick={() => {
              setMenuOpen(false)
              analytics.ctaClicked({ location: 'header' })
            }}
          >
            {cta}
          </a>
        </nav>
      </div>
    </header>
  )
}
