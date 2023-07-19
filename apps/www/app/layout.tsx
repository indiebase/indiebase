'use client';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Layout } from 'components';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Indiebase',
  description:
    'Indiebase - A self-hosted platform explicitly designed for indie developers or open-source developers. Provides financial services and BaaS.',
  keywords: [
    'Indiebase',
    'Baas',
    'Indie',
    'Open Source',
    'Developer',
    'Financial Service',
    'Self Hosted',
  ],
  authors: {
    name: 'Han',
    url: 'https://github.com/nawbc',
  },
  viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
