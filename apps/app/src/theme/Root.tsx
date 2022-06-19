import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
  useEmotionCache,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React, { useState } from 'react';
import { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CacheProvider } from '@emotion/react';
import { ServerStyles, createStylesServer } from '@mantine/ssr';

const queryClient = new QueryClient();
const stylesServer = createStylesServer();

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

  const cache = useEmotionCache();

  return (
    <CacheProvider value={cache}>
      <ServerStyles html={''} server={stylesServer} />

      <QueryClientProvider client={queryClient}>
        {!isProduction && <ReactQueryDevtools position="bottom-left" />}

        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <Global
            styles={(theme) => {
              return [
                {
                  '*, *::before, *::after': {
                    boxSizing: 'border-box',
                  },
                },
              ];
            }}
          />
          <MantineProvider
            theme={{
              colorScheme,
              primaryColor: 'dark',
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider position="top-right">
              {children}
              {/* <Footer /> */}
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
