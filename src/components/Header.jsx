import content from '../lib/content.js'
import logo from '../assets/logo.png'

export default function Header() {
  const { name, tagline, nav = [], cta, ctaLink } = content.site

  return (
    <header className="site-header">
      <div className="container">
        <a href="#top" className="brand">
          <img src={logo} alt={`${name} logo`} />
          <span>
            <span className="brand-name" style={{ display: 'block' }}>
              {name}
            </span>
            <span className="brand-tagline">{tagline}</span>
          </span>
        </a>
        <nav className="nav">
          {nav.map((item) => (
            <a key={item.url} href={item.url} className="nav-link">
              {item.label}
            </a>
          ))}
          <a href={ctaLink} target="_blank" rel="noreferrer" className="btn">
            {cta}
          </a>
        </nav>
      </div>
    </header>
  )
}
