import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served at github.com/taufiqnagori/taufiq-portfolio → taufiqnagori.github.io/taufiq-portfolio/
  base: '/taufiq-portfolio/',
  plugins: [react()],
  build: {
    // Three.js is inherently large; splitting it (and the other animation
    // libs) into named chunks keeps the initial bundle small — the three
    // chunk is only referenced by the lazy-loaded scenes, so it stays off
    // the critical path and loads in parallel after first paint.
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-icons')) return 'icons'
          // three + @react-three/* and the libs only the 3D scenes pull in
          if (
            id.includes('three') ||
            id.includes('react-reconciler') ||
            id.includes('its-fine') ||
            id.includes('zustand') ||
            id.includes('suspend-react')
          )
            return 'three'
          if (id.includes('framer-motion') || id.includes('motion-')) return 'motion'
          if (id.includes('gsap')) return 'gsap'
          // Pin React's runtime (react, react-dom, scheduler) to its own
          // chunk; otherwise the bundler can merge `scheduler` into the three
          // chunk and drag all of three.js onto the critical path.
          if (id.includes('react') || id.includes('scheduler')) return 'react'
        },
      },
    },
  },
})
