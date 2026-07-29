import ReactMarkdown from 'react-markdown'
import content from '../lib/content.js'
import Reveal from './Reveal.jsx'
import boltLogo from '../assets/logos/bolt.png'
import kingLogo from '../assets/logos/king.png'
import deliveryHeroLogo from '../assets/logos/delivery-hero.avif'
import eyeEmLogo from '../assets/logos/eyeem.png'

const LOGOS = {
  Bolt: boltLogo,
  'Delivery Hero': deliveryHeroLogo,
  King: kingLogo,
  EyeEm: eyeEmLogo,
}

export default function Experience() {
  const { items = [], footer } = content.experience

  return (
    <section className="section section-dark experience">
      <div className="container">
        <div className="experience-grid">
          {items.map((item, i) => (
            <Reveal as="div" key={item.name} delay={i * 80} className="experience-card">
              <img className="experience-logo-img" src={LOGOS[item.name]} alt={item.name} />
              <div className="section-body">
                <ReactMarkdown>{item.body}</ReactMarkdown>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="experience-footer">
          {footer}
        </Reveal>
      </div>
    </section>
  )
}
