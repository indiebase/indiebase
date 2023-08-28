import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA()],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
