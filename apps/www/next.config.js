// const { withSentryConfig } = require('@sentry/nextjs');

const withNextra = require('nextra')({
  // theme: '@indiebase/nextra-theme-docs',
  themeConfig: './theme.config.js',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    externalDir: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  redirects: () => {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started',
        statusCode: 301,
      },
    ];
  },
};

module.exports = withNextra(nextConfig);
