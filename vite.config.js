import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from mirunapopa.com (custom domain root), not a /portfolio_website/ subpath
export default defineConfig({
  plugins: [react()],
  base: '/',
  // On this machine "localhost" resolves to the IPv6 loopback (::1) and
  // Vite only binds the single address it's given, so browsers that try
  // 127.0.0.1 first get connection refused. Binding explicitly to the
  // IPv4 loopback avoids that mismatch.
  server: {
    host: '127.0.0.1',
  },
})
