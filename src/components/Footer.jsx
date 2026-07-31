import { Link } from 'react-router-dom'
import content from '../lib/content.js'
import { analytics } from '../lib/analytics.js'

export default function Footer() {
  const { title, email, social, legal = [] } = content.contact

  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="footer-main">
          <h2 className="footer-title">{title}</h2>
          <div className="footer-contact">
            <a
              href={`mailto:${email}`}
              onClick={() => analytics.emailClicked()}
            >
              {email}
            </a>
            {social && (
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => analytics.socialClicked({ network: social.label })}
              >
                {social.label}
              </a>
            )}
          </div>
          <div className="footer-legal">
            {legal.map((item) => (
              <Link key={item.label} to={item.url}>
                {item.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
