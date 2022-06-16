import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();

// Router.events.on('routeChangeStart', NProgress.start);
// Router.events.on('routeChangeComplete', NProgress.done);
// Router.events.on('routeChangeError', NProgress.done);

// Default implementation, that you can customize
export default function Root({ children }) {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const isProduction = useMemo(
    () => (customFields as any).env.NODE_ENV === 'production',
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      {!isProduction && <ReactQueryDevtools position="bottom-right" />}

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <Global
          styles={() => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
            },
          })}
        />
        <MantineProvider
          theme={{ colorScheme, primaryColor: 'dark' }}
          withGlobalStyles
          withNormalizeCSS
          emotionOptions={{ key: 'mantine' }}
        >
          <NotificationsProvider position="top-right">
            {children}
            {/* <Footer /> */}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
}
