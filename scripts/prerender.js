// This is a client-only React app (see src/main.jsx), so a plain `vite
// build` produces an empty <div id="root"></div> shell — all content and
// per-page <title>/meta tags (src/hooks/usePageMeta.js) only exist after
// React mounts and runs its effects. Crawlers that don't execute
// JavaScript (most AI answer-engine bots included) never see any of it.
//
// This script boots the built site, visits every route in a headless
// browser, waits for React to render and set that route's meta tags, then
// writes the resulting DOM to dist/<route>/index.html. That also gives
// GitHub Pages a real file per route (200 instead of a 404), so it
// replaces the old generate-static-routes.js copy step.
import { mkdirSync, readFileSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { preview } from 'vite'
import puppeteer from 'puppeteer'

const rootDir = join(import.meta.dirname, '..')
const distDir = join(rootDir, 'dist')
const posts = JSON.parse(readFileSync(join(rootDir, 'src', 'data', 'substack-posts.json'), 'utf-8'))

const routes = [
  '/',
  '/about',
  '/services',
  '/writing',
  '/impressum',
  '/datenschutzerklarung',
  ...posts.map((post) => `/writing/${post.slug}`),
]

const server = await preview({ preview: { port: 4174, strictPort: true } })
const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '')

const browser = await puppeteer.launch()

try {
  for (const route of routes) {
    const page = await browser.newPage()
    // Fresh Chrome profile has no cookie_consent, so PostHog defaults to
    // opted-out already — this just also keeps the cookie banner out of
    // the prerendered markup, since it has nothing useful for crawlers.
    await page.evaluateOnNewDocument(() => {
      window.localStorage.setItem('cookie_consent', 'rejected')
    })
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0' })
    await page.waitForSelector('#root > *')

    // posthog.init() (src/lib/posthog.js) injects its extension scripts
    // into <head> at runtime. Baking those into the static snapshot would
    // make the client bundle load them a second time on every real visit,
    // so strip anything the build's own index.html didn't already have.
    await page.evaluate(() => {
      document.querySelectorAll('script[src^="https://"]').forEach((el) => el.remove())
    })

    const html = await page.content()
    const outFile = route === '/' ? join(distDir, 'index.html') : join(distDir, route, 'index.html')
    mkdirSync(dirname(outFile), { recursive: true })
    await writeFile(outFile, html)
    console.log(`Prerendered ${route} -> ${outFile.replace(distDir, 'dist')}`)

    await page.close()
  }
} finally {
  await browser.close()
  await new Promise((resolve) => server.httpServer.close(resolve))
}

// public/sitemap.xml is static and can't know about posts that rotate in
// and out of the feed, so regenerate it here from the same route list
// that just got prerendered — keeps it accurate on every build.
const SITE_URL = 'https://mirunapopa.com'
const PRIORITY = {
  '/': '1.0',
  '/about': '0.8',
  '/services': '0.8',
  '/writing': '0.7',
  '/impressum': '0.1',
  '/datenschutzerklarung': '0.1',
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}/`
    const priority = PRIORITY[route] ?? '0.6'
    return `  <url>\n    <loc>${loc}</loc>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join('\n')}
</urlset>
`

await writeFile(join(distDir, 'sitemap.xml'), sitemap)
console.log('Regenerated dist/sitemap.xml')
