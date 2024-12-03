// eslint-disable-next-line simple-import-sort/imports
import '@deskbtm/gadgets/env';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './global.css';

import { Partytown } from '@builder.io/partytown/react';
import { SuperCowPower } from '@indiebase/app-shared';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';

import { type FC } from 'react';
import { Compose, type ComposeProps } from 'reactgets';
import * as uuid from 'uuid';

import { fonts } from '~/fonts';
import { routing } from '~/i18n/routing';
import { openGraphMetadata, twitterSummaryLargeImageMetadata } from '~/shared';
import { colorSchemeManager, cssVariablesResolver, theme } from '~/theme';

import { DevTools } from './DevTools';
import { QueryClientProvider } from './QueryClientProvider';
import { RouterProgress } from '~/components/RouterProgress';

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

// export const runtime = 'edge';

interface RootLayoutProps extends React.PropsWithChildren {
  params: { locale: string };
}

const RootLayout: FC<RootLayoutProps> = async ({ children, params }) => {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const providers: ComposeProps['providers'] = [
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      classNamesPrefix="indiebase"
      key={uuid.v4()}
      theme={theme}
      cssVariablesResolver={cssVariablesResolver}
      defaultColorScheme="light"
    />,
    <QueryClientProvider />,
  ];

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
        <Partytown debug={kDevMode} forward={['dataLayer.push']} />
      </head>
      <body className={fonts.className}>
        <Compose providers={providers}>
          <RouterProgress />
          <SuperCowPower />
          <DevTools />
          <Notifications />
          {children}
        </Compose>
      </body>
    </html>
  );
};

export default RootLayout;
