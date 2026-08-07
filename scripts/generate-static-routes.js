// GitHub Pages has no server-side rewrites, so a direct visit to a route
// like /about with no matching file returns a genuine HTTP 404 (see
// public/404.html for the fallback that handles unknown paths). Search
// engines read that 404 status and refuse to index the page, even though
// the client-side redirect makes it work fine for real visitors.
//
// For routes we know about ahead of time, the fix is to give each one a
// real file so GitHub Pages returns 200 directly — React Router still
// renders the right page based on the URL once it mounts.
import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(import.meta.dirname, '..', 'dist')
const indexFile = join(distDir, 'index.html')
const routes = ['about', 'impressum', 'datenschutzerklarung']

for (const route of routes) {
  const routeDir = join(distDir, route)
  if (!existsSync(routeDir)) mkdirSync(routeDir, { recursive: true })
  cpSync(indexFile, join(routeDir, 'index.html'))
  console.log(`Generated dist/${route}/index.html`)
}
