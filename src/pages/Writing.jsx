import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import content from '../lib/content.js'
import posts from '../data/substack-posts.json'
import { analytics } from '../lib/analytics.js'
import usePageMeta from '../hooks/usePageMeta.js'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

function formatDate(pubDate) {
  const date = new Date(pubDate)
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date)
}

export default function Writing() {
  const { title, intro, cta, ctaLink } = content.writing
  usePageMeta({
    title: 'Newsletter — Miruna Popa',
    description: intro.replace(/\*/g, ''),
    path: '/writing/',
  })

  return (
    <>
      <Header />

      <section className="section section-light writing-hero">
        <div className="container">
          <Reveal as="h1" className="section-heading center">
            {title}
          </Reveal>
          <Reveal as="div" delay={100} className="section-body writing-intro">
            <ReactMarkdown>{intro}</ReactMarkdown>
          </Reveal>
          <Reveal as="div" delay={150} className="writing-cta">
            <a
              href={ctaLink}
              target="_blank"
              rel="noreferrer"
              className="btn"
              onClick={() => analytics.ctaClicked({ location: 'writing-hero' })}
            >
              {cta}
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section section-light writing-list">
        <div className="container">
          {posts.length === 0 ? (
            <p className="section-body">New posts are on their way — check back soon.</p>
          ) : (
            <div className="writing-grid">
              {posts.map((post, i) => (
                <Reveal
                  as={Link}
                  key={post.link}
                  delay={i * 80}
                  className="writing-card"
                  to={`/writing/${post.slug}/`}
                  onClick={() => analytics.substackPostClicked({ title: post.title })}
                >
                  {post.image && <img src={post.image} alt="" className="writing-card-img" loading="lazy" />}
                  <div className="writing-card-body">
                    <span className="writing-card-date">{formatDate(post.pubDate)}</span>
                    <h2 className="writing-card-title">{post.title}</h2>
                    <p className="writing-card-excerpt">{post.excerpt}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
