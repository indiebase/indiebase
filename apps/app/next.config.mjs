// import million from 'million/compiler';
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
};

// const millionConfig = {
//   // if you're using RSC: auto: { rsc: true },
//   auto: true,
// };

// const withMillion = million.next(nextConfig, millionConfig);

export default withNextIntl(nextConfig);
