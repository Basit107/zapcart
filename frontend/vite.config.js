import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'frontend', // <-- path to your React frontend
  build: {
    outDir: 'dist',
    assetsDir: 'static', // places assets inside the static directory of the dist folder
    emptyOutDir: true, // clear the output directory before building
  },
  server: {
    port: 3000,
  },
})
