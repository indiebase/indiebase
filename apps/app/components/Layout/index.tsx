/* eslint-disable  react/no-unescaped-entities */
// backface-visibility: hidden;
// perspective: 1000;

// -webkit-backface-visibility: hidden;
// -webkit-perspective: 1000;

// -moz-backface-visibility: hidden;
// -moz-perspective: 1000;

// -webkit-transform: translate3d(0, 0, 0);
// -moz-transform: translate3d(0, 0, 0);
// -ms-transform: translate3d(0, 0, 0);
// -o-transform: translate3d(0, 0, 0);
// transform: translate3d(0, 0, 0);

import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { Footer, Header } from 'components';
import { FC, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { NotificationsProvider } from '@mantine/notifications';

export const Layout: FC<PropsWithChildren> = (props) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
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
      >
        <NotificationsProvider position="top-right">
          <AppShell
            styles={{
              main: {
                padding: 'unset',
                background:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.white,
              },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Navbar p="md" width={{ sm: 200, lg: 300 }} hidden={!opened}>
                  <Text>Application navbar</Text>
                </Navbar>
              </MediaQuery>
            }
            header={
              <Header
                navbarOpened={opened}
                onNavbarOpen={() => setOpened((o) => !o)}
              />
            }
          >
            {props.children}
          </AppShell>

          <Footer />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
