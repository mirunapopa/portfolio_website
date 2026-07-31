# PostHog setup report

PostHog was added to the Vite React portfolio for anonymous contact and outbound-link analytics, browser exception tracking, and a starter dashboard.

## What was installed and initialized

- Installed `posthog-js` with npm; `package.json` and `package-lock.json` were updated.
- Added one browser-only SDK initialization module at `src/lib/posthog.js`, imported before React renders from `src/main.jsx`.
- Initialization reads `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST`, documented in `.env.example`; the real local values were configured through the wizard environment tooling.
- Missing configuration remains a production no-op and reports an actionable development error. Default PostHog collection behavior was retained.
- No server-side SDK was added because the visible app is a client-only Vite application.

## Instrumented events

These events are wired to reachable click handlers. The run did **not** observe events arriving in PostHog, so delivery remains unconfirmed until the deployed app is exercised.

| Event | What it measures | Instrumented file(s) |
|---|---|---|
| `contact_cta_clicked` | A visitor selects the primary contact CTA from the header, hero, or services section; the non-PII `source` distinguishes placement. | `src/components/Header.jsx`; `src/components/Hero.jsx`; `src/components/Services.jsx` |
| `contact_email_clicked` | A visitor selects the footer contact email link. | `src/components/Footer.jsx` |
| `social_profile_clicked` | A visitor selects the footer social profile link. | `src/components/Footer.jsx` |

No email address or other PII is included in event properties. Pageviews and ordinary click activity remain covered by the SDK's default autocapture behavior.

## User identification

Identification was skipped. The app has no login, registration, logout, session, or authenticated-user flow, and its footer email is static public content rather than an identity source. Events therefore remain anonymous. If authentication is added later, use that system's stable non-PII user ID with `identify()` and call `reset()` on logout; do not use the displayed contact email.

## Error tracking

Global exception autocapture was enabled with `capture_exceptions: true` in `src/lib/posthog.js`. This is configured, but the run did not trigger an exception or observe an error event arriving in PostHog.

## Dashboard

[Analytics basics (wizard)](https://eu.posthog.com/project/237557/dashboard/863865)

The dashboard contains four tagged insights: daily contact CTA trend, contact CTA placement breakdown, email-versus-social outbound engagement trend, and a contact CTA-to-email intent funnel. It may remain empty until traffic produces captures.

## Verification and unresolved issues

- `npm install` completed successfully with the declared dependency already resolved.
- `npm run build` passed with Vite 5.4.21, transforming 237 modules and producing `dist/`. This verifies compilation only; it does not verify that events flow to PostHog.
- No lint or typecheck scripts are present in `package.json`, so neither was run.
- The run did not exercise the deployed app, confirm event delivery, confirm exception delivery, or validate production environment configuration.
- npm reported four existing audit vulnerabilities (three moderate and one high); no remediation was attempted because it was unrelated to this integration.

### Build conflict

The build completed successfully, but Vite emitted its existing chunk-size warning for a 598.37 kB minified JavaScript chunk. This was not caused by a failed PostHog integration and was not remediated. npm also reported four existing audit vulnerabilities (three moderate, one high); these were left unchanged.

## Before you merge

- [ ] Set `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` in every deployment environment, not only local `.env`; verify the names in `.env.example` and the reads in `src/lib/posthog.js` (lines 3–4).
- [ ] Run the deployed portfolio and click the header, hero, services, footer email, and footer social targets; confirm `contact_cta_clicked`, `contact_email_clicked`, and `social_profile_clicked` arrive in PostHog. Check the handlers in `src/components/Header.jsx:32`, `src/components/Hero.jsx:21`, `src/components/Services.jsx:23`, and `src/components/Footer.jsx:16,25`.
- [ ] Trigger a safe test exception in a non-production environment and confirm Error Tracking receives it from the `capture_exceptions: true` setting in `src/lib/posthog.js:16`.
- [ ] Run the full production build and test suite before merging; the wizard verified `npm run build` only, and no test command was run.
- [ ] If the production site serves minified browser bundles, add source-map upload to CI so production stack traces de-minify; see https://posthog.com/docs/error-tracking/ sourcemaps guidance.
