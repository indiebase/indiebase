import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    include: ['**/*.e2e-spec.ts'],
    reporters: ['html'],
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});
