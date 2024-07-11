import '@deskbtm/gadgets/env';
import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';
import './global.css';

import { Partytown } from '@builder.io/partytown/react';
import { SuperCowPower } from '@indiebase/app-shared';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Metadata, Viewport } from 'next';
import { type FC } from 'react';
import { Compose, type ComposeProps } from 'reactgets';
import * as uuid from 'uuid';

import { fonts } from '~/fonts';
import { locales } from '~/i18n';
import { openGraphMetadata, twitterSummaryLargeImageMetadata } from '~/shared';
import { colorSchemeManager, cssVariablesResolver, theme } from '~/theme';

// import { JotaiDevtools } from './JotaiDevtools';
import { QueryClientProvider } from './QueryClientProvider';

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

const DevTools: FC = function () {
  return kDevMode ? (
    <>
      {/* <JotaiDevtools /> */}
      <ReactQueryDevtools initialIsOpen={kDevMode} position="bottom" />
    </>
  ) : null;
};

const RootLayout: FC<RootLayoutProps> = ({ children, params: { locale } }) => {
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
          <NavigationProgress />
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
