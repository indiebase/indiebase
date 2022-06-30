/* eslint-disable  react/no-unescaped-entities */

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
        styles={(theme) => ({
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
                background:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
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
