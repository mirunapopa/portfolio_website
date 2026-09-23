import ReactMarkdown from 'react-markdown'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import ServicesSection from '../components/Services.jsx'
import Testimonials from '../components/Testimonials.jsx'
import BookCall from '../components/BookCall.jsx'
import content from '../lib/content.js'
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
const PAGE_URL = `${SITE_URL}/about/`

export default function AboutMe() {
  const { title, metaTitle, metaDescription, body } = content['about-me']
  const [story, ...moreSections] = splitSections(body)
  const { body: servicesBody, tiers = [], faq = [] } = content.services
  const { items: testimonials = [] } = content.testimonials
  usePageMeta({
    title: metaTitle,
    description: metaDescription,
    path: '/about/',
    jsonLd: [
      {
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
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Fractional Product Analytics',
        serviceType: 'Product Analytics Consulting',
        description: servicesBody,
        url: `${PAGE_URL}#services`,
        provider: {
          '@type': 'Person',
          name: 'Miruna Popa',
          url: `${SITE_URL}/`,
        },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Engagement options',
          itemListElement: tiers.map((tier) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: tier.title,
              description: [tier.intro, ...(tier.items ?? [])].join(' '),
            },
          })),
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  })

  return (
    <>
      <Header />

      <section className="section section-light about-section about-hero">
        <div className="container">
          <Reveal as="h1" className="about-title">
            {title}
          </Reveal>
        </div>
      </section>

      {story && (
        <section className="section section-light about-section">
          <div className="container">
            <Reveal as="div" className="about-story">
              <h2 className="about-heading">{story.heading}</h2>
              <div className="section-body">
                <ReactMarkdown>{story.body}</ReactMarkdown>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <Testimonials />

      {moreSections.map((section) => (
        <section className="section section-light about-section" key={section.heading}>
          <div className="container">
            <Reveal as="div" className="about-text-right">
              <h2 className="about-heading">{section.heading}</h2>
              <div className="section-body">
                <ReactMarkdown>{section.body}</ReactMarkdown>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <ServicesSection />

      <BookCall page="about-me" />

      <Footer />
    </>
  )
}
