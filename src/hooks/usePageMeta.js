import { useEffect } from 'react'

const SITE_URL = 'https://mirunapopa.com'

function setMetaContent(selector, content) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute('content', content)
}

export default function usePageMeta({ title, description, path = '/' }) {
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

    return () => {
      document.title = previousTitle
      if (canonical && previousCanonical) canonical.setAttribute('href', previousCanonical)
    }
  }, [title, description, path])
}
