import ReactMarkdown from 'react-markdown'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import content from '../lib/content.js'
import usePageMeta from '../hooks/usePageMeta.js'

export default function LegalPage({ name, title, description, path }) {
  const { body } = content[name]
  usePageMeta({ title, description, path })

  return (
    <>
      <Header />
      <section className="section section-light legal-page">
        <div className="container legal-content">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </section>
      <Footer />
    </>
  )
}
