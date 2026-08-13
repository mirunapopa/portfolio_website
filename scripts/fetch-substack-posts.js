// GitHub Pages is static, and Substack's RSS feed doesn't send CORS
// headers, so the browser can't fetch it at runtime. Instead we pull the
// feed here at build/dev time and write a plain JSON file the Writing
// component imports directly — same idea as generate-static-routes.js,
// just for content instead of routing.
import { writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { JSDOM } from 'jsdom'

const FEED_URL = 'https://sayitwithdata.substack.com/feed'
const OUTPUT_PATH = join(import.meta.dirname, '..', 'src', 'data', 'substack-posts.json')
const POST_LIMIT = 6

// Substack's RSS <content:encoded> includes its own embedded subscribe
// form and share buttons baked into the post HTML. Those only work on
// Substack's own domain, so they'd render as dead UI on ours — strip any
// element that looks like platform chrome rather than article content.
const CHROME_SELECTORS = [
  '[class*="subscription-widget"]',
  '[class*="subscribe-widget"]',
  '[class*="share-dialog"]',
  '[class*="button-wrapper"]',
  '[data-component-name="SubscribeWidgetToDOM"]',
  '[data-component-name="SharePostToDOM"]',
]

function cleanPostContent(html) {
  const dom = new JSDOM(`<!doctype html><body>${html}</body>`)
  const { document } = dom.window
  document.querySelectorAll(CHROME_SELECTORS.join(',')).forEach((el) => el.remove())
  return document.body.innerHTML.trim()
}

function slugify(link) {
  return link.replace(/\/+$/, '').split('/').pop()
}

const NAMED_ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
}

function decodeEntities(str) {
  return str
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, name) => NAMED_ENTITIES[name])
}

function stripCdata(str) {
  const match = /^<!\[CDATA\[([\s\S]*)\]\]>$/.exec(str.trim())
  return decodeEntities(match ? match[1] : str.trim())
}

function extractTag(block, tag) {
  const match = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`).exec(block)
  return match ? stripCdata(match[1]) : ''
}

function extractImage(block) {
  const match = /<enclosure[^>]*url="([^"]+)"/.exec(block)
  return match ? match[1] : null
}

function parseFeed(xml) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) || []
  return items.slice(0, POST_LIMIT).map((block) => {
    const link = extractTag(block, 'link')
    return {
      title: extractTag(block, 'title'),
      link,
      slug: slugify(link),
      excerpt: extractTag(block, 'description'),
      pubDate: extractTag(block, 'pubDate'),
      image: extractImage(block),
      content: cleanPostContent(extractTag(block, 'content:encoded')),
    }
  })
}

try {
  const res = await fetch(FEED_URL)
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  const xml = await res.text()
  const posts = parseFeed(xml)

  if (posts.length === 0) throw new Error('feed returned zero items')

  writeFileSync(OUTPUT_PATH, JSON.stringify(posts, null, 2) + '\n')
  console.log(`Fetched ${posts.length} Substack posts -> src/data/substack-posts.json`)
} catch (err) {
  if (existsSync(OUTPUT_PATH)) {
    console.warn(`Could not refresh Substack posts (${err.message}), keeping existing src/data/substack-posts.json`)
  } else {
    console.warn(`Could not fetch Substack posts (${err.message}), writing empty list`)
    writeFileSync(OUTPUT_PATH, '[]\n')
  }
}
