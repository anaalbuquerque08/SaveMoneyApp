import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icons/*.png'],
      manifest: {
        name: 'SaveMoney+',
        short_name: 'App',
        start_url: '.',
        display: 'standalone',
        background_color: '#f8f8f8',
        theme_color: '#f8f8f8',
        icons: [
          { src: '/icons/196.png', sizes: '196x196', type: 'image/png' },
          { src: '/icons/512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
