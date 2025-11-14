import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  define: {
    __APP_NAME__: JSON.stringify(process.env.VITE_APP_NAME || 'Ashesi Research Club'),
    __APP_DESCRIPTION__: JSON.stringify(process.env.VITE_APP_DESCRIPTION || 'Ashesi University Research Club - Fostering innovation and discovery'),
  }
})
