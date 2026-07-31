import { Routes, Route } from 'react-router-dom'
import { CookieConsentProvider } from './lib/CookieConsentContext.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import PageViewTracker from './components/PageViewTracker.jsx'
import CookieBanner from './components/CookieBanner.jsx'
import CookiePreferencesButton from './components/CookiePreferencesButton.jsx'
import Home from './pages/Home.jsx'
import AboutMe from './pages/AboutMe.jsx'
import Datenschutzerklarung from './pages/Datenschutzerklarung.jsx'
import Impressum from './pages/Impressum.jsx'

export default function App() {
  return (
    <CookieConsentProvider>
      <ScrollToTop />
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/datenschutzerklarung" element={<Datenschutzerklarung />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
      <CookieBanner />
      <CookiePreferencesButton />
    </CookieConsentProvider>
  )
}
