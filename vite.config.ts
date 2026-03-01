import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import UnpluginFonts from 'unplugin-fonts/vite'

export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    hmr: {
      protocol: 'wss',
      clientPort: 443,
    },
    allowedHosts: ['.ngrok-free.app']
  },
  plugins: [
    sveltekit(),
    UnpluginFonts({
      custom: {
        families: [
          {
            name: 'Geist',
            local: 'Geist',
            src: './static/fonts/Geist-Regular.woff2',
          },
          {
            name: 'Andika',
            local: 'Andika',
            src: './static/fonts/Andika-Regular.woff2',
          },
        ],
        display: 'swap',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
  ],
})
