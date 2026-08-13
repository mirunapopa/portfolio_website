import { useParams, Navigate, Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Reveal from '../components/Reveal.jsx'
import posts from '../data/substack-posts.json'
import { analytics } from '../lib/analytics.js'
import usePageMeta from '../hooks/usePageMeta.js'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

function formatDate(pubDate) {
  const date = new Date(pubDate)
  return Number.isNaN(date.getTime()) ? '' : dateFormatter.format(date)
}

export default function WritingPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  usePageMeta({
    title: post ? `${post.title} — Miruna Popa` : 'Newsletter — Miruna Popa',
    description: post ? post.excerpt : '',
    path: `/writing/${slug}/`,
  })

  if (!post) return <Navigate to="/writing/" replace />

  const safeContent = DOMPurify.sanitize(post.content)

  return (
    <>
      <Header />

      <article className="section section-light post">
        <div className="container post-container">
          <Link to="/writing/" className="post-back">
            ← Back to Newsletter
          </Link>

          <Reveal as="h1" className="post-title">
            {post.title}
          </Reveal>
          <p className="post-meta">{formatDate(post.pubDate)}</p>

          <div className="post-cta">
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              onClick={() => analytics.substackPostClicked({ title: post.title, location: 'post-page' })}
            >
              View original on Substack
            </a>
            <a
              href="https://sayitwithdata.substack.com"
              target="_blank"
              rel="noreferrer"
              className="btn"
              onClick={() => analytics.ctaClicked({ location: 'post-subscribe' })}
            >
              Subscribe on Substack
            </a>
          </div>

          {post.image && <img src={post.image} alt="" className="post-image" />}

          <div className="section-body post-excerpt">
            <p>{post.excerpt}</p>
          </div>

          <div className="section-body post-body" dangerouslySetInnerHTML={{ __html: safeContent }} />
        </div>
      </article>

      <Footer />
    </>
  )
}
