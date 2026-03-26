import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANTE: El nombre debe coincidir con tu repo de GitHub
  base: '/Portafolio-/', 
})