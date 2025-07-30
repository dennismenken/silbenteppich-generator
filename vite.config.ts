import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import UnpluginFonts from 'unplugin-fonts/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    UnpluginFonts({
      // All fonts hosted locally for optimal performance and privacy
      custom: {
        families: [
          {
            name: 'Geist',
            local: 'Geist',
            src: './public/fonts/Geist-Regular.woff2',
          },
          {
            name: 'Andika',
            local: 'Andika', 
            src: './public/fonts/Andika-Regular.woff2',
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
