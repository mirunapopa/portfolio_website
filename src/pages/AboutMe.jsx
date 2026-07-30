import ReactMarkdown from 'react-markdown'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import content from '../lib/content.js'
import cassetteImg from '../assets/about-cassette.jpg'
import lampImg from '../assets/about-lamp.jpg'
import coffeeImg from '../assets/about-coffee.jpg'

function splitSections(body) {
  return body
    .split(/^# /m)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [heading, ...rest] = chunk.split('\n')
      return { heading: heading.trim(), body: rest.join('\n').trim() }
    })
}

export default function AboutMe() {
  const { title, body } = content['about-me']
  const [story, curiosity, quote] = splitSections(body)

  return (
    <>
      <Header />

      <section className="section section-light about-section about-hero">
        <div className="container">
          <Reveal as="h1" className="about-title">
            {title}
          </Reveal>
          <Reveal as="img" delay={100} src={cassetteImg} alt="" className="about-hero-img" />
        </div>
      </section>

      <section className="section section-light about-section">
        <div className="container about-grid">
          <Reveal as="div">
            <h2 className="about-heading">{story.heading}</h2>
            <div className="section-body">
              <ReactMarkdown>{story.body}</ReactMarkdown>
            </div>
          </Reveal>
          <Reveal as="img" delay={100} src={lampImg} alt="" className="about-side-img" />
        </div>
      </section>

      <section className="section section-light about-section">
        <div className="container">
          <Reveal as="div" className="about-text-right">
            <h2 className="about-heading">{curiosity.heading}</h2>
            <div className="section-body">
              <ReactMarkdown>{curiosity.body}</ReactMarkdown>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="about-section about-photo-section">
        <div className="container">
          <img src={coffeeImg} alt="" className="about-full-img" />
        </div>
      </div>

      <section className="section section-light about-section about-quote">
        <div className="container">
          <Reveal as="blockquote" className="about-quote-text">
            <ReactMarkdown>{quote.heading}</ReactMarkdown>
          </Reveal>
          <Reveal as="div" delay={100} className="about-quote-attribution">
            <ReactMarkdown>{quote.body}</ReactMarkdown>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
