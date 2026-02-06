import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'screenshot.jpg'],
      manifest: {
        name: 'The BuildersHubb',
        short_name: 'The BuildersHubb',
        description:
          'The BuildersHubb - Premium electrical, solar, CCTV, and smart home solutions. Professional installation services with industry-leading warranties.',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/logo.jpeg',
            sizes: 'any',
            type: 'image/jpeg',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
