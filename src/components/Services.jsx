import ReactMarkdown from 'react-markdown'
import content from '../lib/content.js'
import Reveal from './Reveal.jsx'
import { analytics } from '../lib/analytics.js'

export default function Services() {
  const { title, location, cta, ctaLink, tiers = [], body } = content.services

  return (
    <section id="services" className="section section-dark services">
      <div className="container services-grid">
        <Reveal as="div" className="services-intro">
          <h2 className="section-heading">{title}</h2>
          <div className="section-body">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
          <p className="services-location">{location}</p>
          <a
            href={ctaLink}
            target="_blank"
            rel="noreferrer"
            className="btn"
            onClick={() => analytics.ctaClicked({ location: 'services' })}
          >
            {cta}
          </a>
        </Reveal>
        <div>
          {tiers.map((tier, i) => (
            <Reveal as="div" key={tier.title} delay={i * 100} className="service-tier">
              <h3>{tier.title}</h3>
              <p>{tier.intro}</p>
              {tier.items && (
                <ul>
                  {tier.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
