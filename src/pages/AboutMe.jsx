import ReactMarkdown from 'react-markdown'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import Testimonials from '../components/Testimonials.jsx'
import BookCall from '../components/BookCall.jsx'
import content from '../lib/content.js'
import cassetteImg from '../assets/about-cassette.jpg'
import lampImg from '../assets/about-lamp.jpg'
import coffeeImg from '../assets/about-coffee.jpg'
import usePageMeta from '../hooks/usePageMeta.js'

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

const SITE_URL = 'https://mirunapopa.com'

export default function AboutMe() {
  const { title, body } = content['about-me']
  const [story, curiosity] = splitSections(body)
  const { items: testimonials = [] } = content.testimonials
  usePageMeta({
    title: 'About Me — Miruna Popa',
    description: title,
    path: '/about/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'Miruna Popa',
        url: `${SITE_URL}/`,
        jobTitle: 'Fractional Product Analytics Consultant',
        description: title,
        knowsAbout: [
          'Product Analytics',
          'A/B Testing',
          'Experimentation',
          'Root Cause Analysis',
          'Data Tracking',
          'Product Metrics',
          'Data Pipelines',
        ],
        review: testimonials.map((t) => ({
          '@type': 'Review',
          reviewBody: t.quote,
          author: { '@type': 'Person', name: t.name },
          itemReviewed: {
            '@type': 'Service',
            name: 'Fractional Product Analytics',
            provider: { '@type': 'Person', name: 'Miruna Popa' },
          },
        })),
      },
    },
  })

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

      <Testimonials />

      <BookCall page="about-me" />

      <Footer />
    </>
  )
}
