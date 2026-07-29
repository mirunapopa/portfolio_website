import content from '../lib/content.js'
import Reveal from './Reveal.jsx'

export default function About() {
  const { title, body } = content.about

  return (
    <section id="about" className="section section-light about">
      <div className="container">
        <Reveal as="h2" className="section-heading center">
          {title}
        </Reveal>
        <Reveal as="div" delay={100} className="section-body">
          <p>{body}</p>
        </Reveal>
      </div>
    </section>
  )
}
