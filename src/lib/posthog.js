import posthog from 'posthog-js'

const posthogKey = import.meta.env.VITE_POSTHOG_KEY
const posthogHost = import.meta.env.VITE_POSTHOG_HOST

if (!posthogKey || !posthogHost) {
  if (import.meta.env.DEV) {
    const missingVariable = !posthogKey ? 'VITE_POSTHOG_KEY' : 'VITE_POSTHOG_HOST'
    throw new Error(
      `${missingVariable} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${missingVariable} is configured`,
    )
  }
} else {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    capture_exceptions: true,
    // This is a single-page app using hash-based routing, which the
    // default pageview autocapture doesn't detect on in-app navigation.
    // PageViewTracker fires $pageview manually on every route change instead.
    capture_pageview: false,
    // GDPR: nothing is captured until the cookie banner records an
    // explicit accept via posthog.opt_in_capturing().
    opt_out_capturing_by_default: true,
  })
}

export default posthog
