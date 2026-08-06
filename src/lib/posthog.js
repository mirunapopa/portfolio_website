import posthog from 'posthog-js'

const posthogKey = import.meta.env.VITE_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST

const CONSENT_KEY = 'cookie_consent'

function getStoredConsent() {
  return localStorage.getItem(CONSENT_KEY) // 'accepted' | 'rejected' | null
}

if (!posthogKey || !posthogHost) {
  if (import.meta.env.DEV) {
    const missingVariable = !posthogKey ? 'VITE_POSTHOG_KEY' : 'VITE_POSTHOG_HOST'
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
    )
  }
} else {
  const consent = getStoredConsent()
  posthog.init(posthogKey, {
    api_host: posthogHost,
    // Requests go through our managed reverse proxy (posthogHost), so this
    // tells the SDK where the actual PostHog app lives for generated links
    // (session replay, toolbar, etc.) to resolve correctly.
    ui_host: 'https://eu.posthog.com',
    defaults: '2026-05-30',
    // This site never calls identify() — all visitors stay anonymous —
    // so there's no reason to create a full person profile per visitor.
    person_profiles: 'identified_only',
    capture_exceptions: true,
    // This is a single-page app using hash-based routing, which the
    // default pageview autocapture doesn't detect on in-app navigation.
    // PageViewTracker fires $pageview manually on every route change instead.
    capture_pageview: false,
    // GDPR: nothing is captured, and nothing is written to localStorage
    // or a cookie, until the visitor accepts via the cookie banner —
    // opt_out_capturing_by_default alone only blocks sending events, it
    // doesn't stop PostHog persisting a device/distinct ID on its own.
    opt_out_capturing_by_default: consent !== 'accepted',
    persistence: consent === 'accepted' ? 'localStorage+cookie' : 'memory',
  })
}

export function hasStoredConsent() {
  return getStoredConsent() !== null
}

export function acceptCookies() {
  localStorage.setItem(CONSENT_KEY, 'accepted')
  posthog.set_config({ persistence: 'localStorage+cookie' })
  posthog.opt_in_capturing()
}

export function rejectCookies() {
  localStorage.setItem(CONSENT_KEY, 'rejected')
  posthog.opt_out_capturing()
}

export default posthog
