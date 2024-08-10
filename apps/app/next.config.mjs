import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  transpilePackages: ['jotai-devtools'],
  experimental: {
    reactCompiler: true,
    optimizePackageImports: [
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/dates',
      '@mantine/hooks',
      '@mantine/notifications',
      '@mantine/dropzone',
    ],
    // swcPlugins: [['@swc-jotai/react-refresh', {}]],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
