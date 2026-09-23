import Header from '../components/Header.jsx'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Experience from '../components/Experience.jsx'
import WorkTogether from '../components/WorkTogether.jsx'
import Footer from '../components/Footer.jsx'
import content from '../lib/content.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function Home() {
  const { name, tagline } = content.site
  usePageMeta({
    title: `${name} — ${tagline}`,
    description: content.hero.body,
    path: '/',
  })

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Experience />
      <WorkTogether />
      <Footer />
    </>
  )
}
