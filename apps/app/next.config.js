const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');
const util = require('util');
const fs = require('fs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    externalDir: true,
  },
};

module.exports = withSentryConfig(nextConfig);
