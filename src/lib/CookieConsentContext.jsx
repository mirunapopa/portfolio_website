import { createContext, useContext, useState } from 'react'
import { hasStoredConsent } from './posthog.js'

const CookieConsentContext = createContext(null)

export function CookieConsentProvider({ children }) {
  const [isOpen, setIsOpen] = useState(() => !hasStoredConsent())

  const value = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
}

export function useCookieConsent() {
  return useContext(CookieConsentContext)
}
