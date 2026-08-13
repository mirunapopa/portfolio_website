import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { CookieConsentProvider } from './lib/CookieConsentContext.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import PageViewTracker from './components/PageViewTracker.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import CookiePreferencesButton from './components/CookiePreferencesButton.jsx'
import Home from './pages/Home.jsx'
import AboutMe from './pages/AboutMe.jsx'
import Services from './pages/Services.jsx'
import Writing from './pages/Writing.jsx'
import WritingPost from './pages/WritingPost.jsx'
import Datenschutzerklarung from './pages/Datenschutzerklarung.jsx'
import Impressum from './pages/Impressum.jsx'

function RedirectToNewsletterPost() {
  const { slug } = useParams()
  return <Navigate to={`/newsletter/${slug}`} replace />
}

export default function App() {
  return (
    <CookieConsentProvider>
      <ScrollToTop />
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/services" element={<Services />} />
        <Route path="/newsletter" element={<Writing />} />
        <Route path="/newsletter/:slug" element={<WritingPost />} />
        <Route path="/writing" element={<Navigate to="/newsletter" replace />} />
        <Route path="/writing/:slug" element={<RedirectToNewsletterPost />} />
        <Route path="/datenschutzerklarung" element={<Datenschutzerklarung />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
      <CookieBanner />
      <CookiePreferencesButton />
    </CookieConsentProvider>
  )
}
