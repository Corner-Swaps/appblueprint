import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons-vendor';
          }
          if (id.includes('node_modules/canvas-confetti/')) {
            return 'confetti-vendor';
          }
          if (id.includes('/src/data/')) {
            return 'blueprint-data';
          }
          if (id.includes('/src/components/Website/')) {
            return 'website-bundle';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: false
  }
});
