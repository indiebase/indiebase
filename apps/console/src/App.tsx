import { router } from './Router';
import { Provider } from 'jotai';
import { RouterProvider } from 'react-router-dom';
import { useAtomsDebugValue } from 'jotai/devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { letscollabCustomTheme } from '@letscollab-community/console-utils';
import { useState } from 'react';
import { queryClientAtom } from 'jotai-tanstack-query';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { AuthzProvider, Can } from '@letscollab/react-authz';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
    },
  },
});

const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
};

const isProduction = process.env.NODE_ENV === 'production';

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          globalStyles: () => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
            },
            '.remove-padding-left': {
              paddingLeft: 0,
            },
          }),
          colorScheme,
          primaryColor: 'blue',
          components: {
            Button: { defaultProps: { size: 'xs' } },
          },
          other: letscollabCustomTheme,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider position="top-right">
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
              initialIsOpen={!isProduction}
              position="bottom-right"
            />
            <Provider initialValues={[[queryClientAtom, queryClient]] as const}>
              <DebugAtoms />
              <AuthzProvider
                mode="manual"
                possess={{ read: ['data1', 'data2'] }}
              >
                <Can i="read" the="data1">
                  <RouterProvider router={router} />
                </Can>
              </AuthzProvider>
            </Provider>
          </QueryClientProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
