import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import ServicesSection from '../components/Services.jsx'
import content from '../lib/content.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function Services() {
  const { title, body } = content.services
  usePageMeta({
    title: 'Services — Miruna Popa',
    description: `${title} ${body}`,
    path: '/services/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Fractional Product Analytics',
      serviceType: 'Product Analytics Consulting',
      description: body,
      url: 'https://mirunapopa.com/services/',
      provider: {
        '@type': 'Person',
        name: 'Miruna Popa',
        url: 'https://mirunapopa.com/',
      },
      areaServed: 'Worldwide',
    },
  })

  return (
    <>
      <Header />
      <ServicesSection />
      <Footer />
    </>
  )
}
