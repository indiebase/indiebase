// import './App.less';
import { router } from './Router';
import { Provider, useAtom } from 'jotai';
import { RouterProvider } from 'react-router-dom';
import { useAtomsDebugValue } from 'jotai/devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  userProfileAtom,
  fetchUserProfile,
  letscollabCustomTheme,
} from '@letscollab-community/console-utils';
import { PropsWithChildren, useEffect, useState } from 'react';
import { queryClientAtom } from 'jotai-tanstack-query';
import { AuthzProvider, Can } from '@letscollab/react-authz';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

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

function InitializeUser(props: PropsWithChildren) {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  useEffect(() => {
    fetchUserProfile().then((data) => {
      setUserProfile(data.d);
    });
  }, []);

  return <>{userProfile ? props.children : null}</>;
}

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
              <InitializeUser>
                <AuthzProvider
                  mode="manual"
                  possess={{ read: ['data1', 'data2'] }}
                >
                  <Can i="read" the="data1">
                    <RouterProvider router={router} />
                  </Can>
                </AuthzProvider>
              </InitializeUser>
            </Provider>
          </QueryClientProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
