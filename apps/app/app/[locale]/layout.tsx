import type { Metadata, Viewport } from 'next';
import { locales } from '~/i18n';
import { fonts } from './fonts';
import { FC } from 'react';
import { openGraphMetadata, twitterSummaryLargeImageMetadata } from '~/shared';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    {
      color: '#FFFFFF',
      media: '(prefers-color-scheme: light)',
    },
    {
      color: '#242424',
      media: '(prefers-color-scheme: dark)',
    },
  ],
};

export const metadata: Metadata = {
  title: {
    template: '%s | Indiebase',
    default: 'Indiebase',
  },
  twitter: twitterSummaryLargeImageMetadata,
  openGraph: openGraphMetadata,
};

interface RootLayoutProps extends React.PropsWithChildren {
  params: { locale: string };
}

const RootLayout: FC<RootLayoutProps> = ({ children, params: { locale } }) => {
  return (
    <html lang={locale}>
      <body className={fonts.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
