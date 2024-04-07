import { resolve } from 'node:path';

import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mkcert(),
    million.vite({ auto: true }),
    react({ plugins: [['@swc-jotai/react-refresh', {}]] }),
    VitePWA(),
    vanillaExtractPlugin(),
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
});
