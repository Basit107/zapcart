import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    visualizer({
      filename: './dist/stats.html', // where to save the report
      open: true,                    // open it automatically after build
      gzipSize: true,               // show gzip size
      brotliSize: true              // show brotli size
    })
  ],
  root: 'admin-panel', // Path to your React frontend
  build: {
    outDir: 'dist',
    assetsDir: 'static', // places assets inside the static directory of the dist folder
    emptyOutDir: true, // clear the output directory before building
  },
  server: {
    port: 3100,
  },
})
