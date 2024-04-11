import { type Metadata } from 'next';

export const twitterSummaryLargeImageMetadata: Metadata['twitter'] = {
  card: 'summary_large_image',
  title: 'Indiebase',
  description: 'Indiebase',
  // https://ilo.so/twitter-id/
  siteId: '1363424827990630400',
  creator: '@deskbtm',
  creatorId: '1363424827990630400',
  images: ['https://nextjs.org/og.png'],
};

export const openGraphMetadata: Metadata['openGraph'] = {
  title: 'Indiebase',
  description: 'The React Framework for the Web',
  url: 'https://indiebase.deskbtm.org',
  siteName: 'Indiebase',
  images: [
    {
      url: 'https://nextjs.org/og.png', // Must be an absolute URL
      width: 800,
      height: 600,
    },
    {
      url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
      width: 1800,
      height: 1600,
      alt: 'My custom alt',
    },
  ],
  locale: 'en_US',
  type: 'website',
};
