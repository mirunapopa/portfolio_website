import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { analytics } from '../lib/analytics.js'

const PAGE_NAMES = {
  '/': 'Home',
  '/about': 'About',
  '/datenschutzerklarung': 'Datenschutzerklärung',
  '/impressum': 'Impressum',
}

export default function PageViewTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    analytics.pageViewed({ pageName: PAGE_NAMES[pathname] ?? pathname })
  }, [pathname])

  return null
}
