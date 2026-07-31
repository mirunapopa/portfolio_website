import { Link } from 'react-router-dom'
import posthog from '../lib/posthog.js'
import { useCookieConsent } from '../lib/CookieConsentContext.jsx'
import content from '../lib/content.js'

export default function CookieBanner() {
  const { isOpen, close } = useCookieConsent()
  const { message, learnMoreLabel, learnMoreLink, accept, reject } = content['cookie-banner']

  if (!isOpen) return null

  const handleAccept = () => {
    posthog.opt_in_capturing()
    close()
  }

  const handleReject = () => {
    posthog.opt_out_capturing()
    close()
  }

  return (
    <div className="cookie-banner">
      <p>
        {message} <Link to={learnMoreLink}>{learnMoreLabel}</Link>
      </p>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-btn cookie-btn-reject" onClick={handleReject}>
          {reject}
        </button>
        <button type="button" className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
          {accept}
        </button>
      </div>
    </div>
  )
}
