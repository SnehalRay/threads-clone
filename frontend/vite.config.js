import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://threads-clone-api-one.vercel.app/',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
