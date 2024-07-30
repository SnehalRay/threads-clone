import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server:{
    port:3000,
    proxy:{
      '/api':{
        target:'https://threads-clone-api-one.vercel.app/',
        // target:'http://localhost:8000/',
        changeOrigin:true,
        secure:false
      }
    }
  }
});
