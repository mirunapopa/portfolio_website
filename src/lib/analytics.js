import posthog from './posthog.js'

/**
 * Single place to define every analytics event this site sends.
 * Components call these functions instead of posthog.capture(...)
 * directly, so event names and properties stay consistent and are
 * easy to rename or extend from one file.
 */
export const analytics = {
  pageViewed({ pageName }) {
    posthog.capture('$pageview', { page_name: pageName })
  },

  ctaClicked({ location }) {
    posthog.capture('cta_clicked', { location })
  },

  emailClicked() {
    posthog.capture('email_clicked', { location: 'footer' })
  },

  socialClicked({ network }) {
    posthog.capture('social_clicked', { network, location: 'footer' })
  },
}
