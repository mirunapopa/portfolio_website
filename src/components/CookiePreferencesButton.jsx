import { useCookieConsent } from '../lib/CookieConsentContext.jsx'
import content from '../lib/content.js'

export default function CookiePreferencesButton() {
  const { isOpen, open } = useCookieConsent()
  const { preferencesLabel } = content['cookie-banner']

  if (isOpen) return null

  return (
    <button type="button" className="cookie-preferences-btn" onClick={open}>
      {preferencesLabel}
    </button>
  )
}
