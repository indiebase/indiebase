import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { resolve } from 'node:path';
import million from 'million/compiler';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    react(),
    VitePWA(),
    vanillaExtractPlugin(),
  ],

  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
});
