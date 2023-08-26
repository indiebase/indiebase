/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['jotai-devtools'],
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

module.exports = nextConfig;
