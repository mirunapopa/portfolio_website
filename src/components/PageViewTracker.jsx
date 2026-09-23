import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { analytics } from '../lib/analytics.js'

const PAGE_NAMES = {
  '/': 'Home',
  '/about': 'About',
  '/newsletter': 'Newsletter',
  '/datenschutzerklarung': 'Datenschutzerklärung',
  '/impressum': 'Impressum',
}

export default function PageViewTracker() {
  const { pathname } = useLocation()

  useEffect(() => {
    // URLs carry a trailing slash (/about/), PAGE_NAMES keys don't
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
    analytics.pageViewed({ pageName: PAGE_NAMES[path] ?? path })
  }, [pathname])

  return null
}
