import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server:{
    proxy:{
      "/api":{
        target:'https://wedease-server.onrender.com/api',
        changeOrigin:true,
        secure:true
      }
    }
  }
})
