import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA()],
  resolve: {
    alias: {
      '@/*': './src/*',
    },
  },
});
