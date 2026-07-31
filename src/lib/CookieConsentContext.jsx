import { createContext, useContext, useState } from 'react'

const CookieConsentContext = createContext(null)

// posthog.has_opted_out_capturing() is true as soon as
// opt_out_capturing_by_default is set, even before any real user
// choice — so it can't tell us whether the visitor has actually
// decided yet. We track that decision ourselves instead.
const DECISION_KEY = 'cookie_consent_decided'

function hasDecided() {
  return localStorage.getItem(DECISION_KEY) === 'true'
}

export function CookieConsentProvider({ children }) {
  const [isOpen, setIsOpen] = useState(() => !hasDecided())

  const value = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => {
      localStorage.setItem(DECISION_KEY, 'true')
      setIsOpen(false)
    },
  }

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
}

export function useCookieConsent() {
  return useContext(CookieConsentContext)
}
