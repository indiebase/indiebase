import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'packages/*/vitest.config.{e2e,unit}.ts',
      'community/vitest.config.{e2e,unit}.ts',
    ],
  },
});
