import ReactMarkdown from 'react-markdown'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import content from '../lib/content.js'

export default function LegalPage({ name }) {
  const { body } = content[name]

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
