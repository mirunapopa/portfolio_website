import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'portfolio_website' to your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/portfolio_website/',
})
