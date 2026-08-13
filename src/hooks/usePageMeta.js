import { useEffect } from 'react'

const SITE_URL = 'https://mirunapopa.com'

function setMetaContent(selector, content) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute('content', content)
}

export default function usePageMeta({ title, description, path = '/', jsonLd }) {
  useEffect(() => {
    const previousTitle = document.title
    const url = `${SITE_URL}${path}`

    document.title = title
    setMetaContent('meta[name="description"]', description)
    setMetaContent('meta[property="og:title"]', title)
    setMetaContent('meta[property="og:description"]', description)
    setMetaContent('meta[property="og:url"]', url)
    setMetaContent('meta[name="twitter:title"]', title)
    setMetaContent('meta[name="twitter:description"]', description)

    const canonical = document.querySelector('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href')
    if (canonical) canonical.setAttribute('href', url)

    let script
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.title = previousTitle
      if (canonical && previousCanonical) canonical.setAttribute('href', previousCanonical)
      script?.remove()
    }
  }, [title, description, path, jsonLd])
}
