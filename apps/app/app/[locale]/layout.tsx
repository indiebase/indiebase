import '@mantine/core/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/notifications/styles.css';

import type { Metadata, Viewport } from 'next';
import { locales } from '~/i18n';
import { fonts } from './fonts';
import { type FC } from 'react';
import { openGraphMetadata, twitterSummaryLargeImageMetadata } from '~/shared';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import * as uuid from 'uuid';
import { Compose, type ComposeProps } from 'reactgets';
import { theme } from '~/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationProgress } from '@mantine/nprogress';
import { Notifications } from '@mantine/notifications';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
      <ReactQueryDevtools initialIsOpen={kDevMode} position="bottom" />
    </>
  ) : null;
};

const RootLayout: FC<RootLayoutProps> = ({ children, params: { locale } }) => {
  // const [queryClient] = useState(() => new QueryClient());
  const queryClient = new QueryClient();

  const providers: ComposeProps['providers'] = [
    <MantineProvider
      key={uuid.v4()}
      theme={theme}
      defaultColorScheme="light"
    />,
    // <QueryClientProvider key={u·uid.v4()} client={queryClient} />,
  ];

  return (
    <html lang={locale}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={fonts.className}>
        <Compose providers={providers}>
          {/* <DevTools /> */}
          {/* <NavigationProgress /> */}
          {/* <Notifications /> */}
          {children}
        </Compose>
      </body>
    </html>
  );
};

export default RootLayout;
