import { useEffect, useRef, useState } from 'react'
import content from '../lib/content.js'
import { analytics } from '../lib/analytics.js'
import { useCookieConsent } from '../lib/CookieConsentContext.jsx'
import Reveal from './Reveal.jsx'

const DISMISS_KEY = 'bookCallBarDismissed'

function readDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

export default function BookCall({ page }) {
  const { bookCall } = content.site
  const { isOpen: cookieOpen } = useCookieConsent()
  const bandLocation = `cta-band-${page}`
  const barLocation = `cta-bar-${page}`

  const bandRef = useRef(null)
  const [bandInView, setBandInView] = useState(false)
  const [scrolledEnough, setScrolledEnough] = useState(false)
  const [dismissed, setDismissed] = useState(readDismissed)

  useEffect(() => {
    const node = bandRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setBandInView(entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (dismissed) return undefined
    const onScroll = () => {
      const el = document.documentElement
      const scrollable = el.scrollHeight - el.clientHeight
      const pct = scrollable > 0 ? el.scrollTop / scrollable : 0
      setScrolledEnough(pct > 0.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  const dismiss = () => {
    setDismissed(true)
    analytics.ctaBarDismissed({ location: barLocation })
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      /* sessionStorage unavailable — bar just reappears next load */
    }
  }

  const showBar = scrolledEnough && !bandInView && !dismissed && !cookieOpen

  const barShownRef = useRef(false)
  useEffect(() => {
    if (showBar && !barShownRef.current) {
      barShownRef.current = true
      analytics.ctaBarShown({ location: barLocation })
    }
  }, [showBar])

  return (
    <>
      <section className="section book-call-band" ref={bandRef}>
        <Reveal as="div" className="container book-call-band-inner">
          <p className="book-call-eyebrow">{bookCall.eyebrow}</p>
          <p className="book-call-text">{bookCall.text}</p>
          <a
            href={bookCall.ctaLink}
            target="_blank"
            rel="noreferrer"
            className="btn book-call-band-btn"
            onClick={() => analytics.ctaClicked({ location: bandLocation })}
          >
            {bookCall.cta}
          </a>
        </Reveal>
      </section>

      <div
        className={`book-call-bar ${showBar ? 'book-call-bar-visible' : ''}`}
        role="region"
        aria-label="Book a call"
        aria-hidden={!showBar}
      >
        <p className="book-call-bar-text">{bookCall.barText}</p>
        <div className="book-call-bar-actions">
          <a
            href={bookCall.ctaLink}
            target="_blank"
            rel="noreferrer"
            className="btn book-call-bar-btn"
            tabIndex={showBar ? 0 : -1}
            onClick={() => analytics.ctaClicked({ location: barLocation })}
          >
            {bookCall.cta}
          </a>
          <button
            type="button"
            className="book-call-bar-close"
            aria-label="Dismiss"
            tabIndex={showBar ? 0 : -1}
            onClick={dismiss}
          >
            &times;
          </button>
        </div>
      </div>
    </>
  )
}
