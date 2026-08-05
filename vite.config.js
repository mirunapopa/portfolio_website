import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from mirunapopa.com (custom domain root), not a /portfolio_website/ subpath
export default defineConfig({
  plugins: [react()],
  base: '/',
})
