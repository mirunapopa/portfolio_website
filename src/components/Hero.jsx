import content from '../lib/content.js'
import heroImg from '../assets/hero.jpg'

export default function Hero() {
  const { greeting, cta, ctaLink, body } = content.hero

  return (
    <section id="top" className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-box">
            <h1 className="section-heading hero-heading">{greeting}</h1>
            <p>{body}</p>
          </div>
          <a href={ctaLink} target="_blank" rel="noreferrer" className="btn">
            {cta}
          </a>
        </div>
      </div>
    </section>
  )
}
