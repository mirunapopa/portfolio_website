import { Link } from 'react-router-dom'
import content from '../lib/content.js'
import logo from '../assets/logo.png'

export default function Header() {
  const { name, tagline, nav = [], cta, ctaLink } = content.site

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="brand">
          <img src={logo} alt={`${name} logo`} />
          <span>
            <span className="brand-name" style={{ display: 'block' }}>
              {name}
            </span>
            <span className="brand-tagline">{tagline}</span>
          </span>
        </Link>
        <nav className="nav">
          {nav.map((item) => (
            <Link key={item.url} to={item.url} className="nav-link">
              {item.label}
            </Link>
          ))}
          <a href={ctaLink} target="_blank" rel="noreferrer" className="btn">
            {cta}
          </a>
        </nav>
      </div>
    </header>
  )
}
