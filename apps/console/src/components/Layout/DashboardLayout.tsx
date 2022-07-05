import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
  Navbar,
  useMantineTheme,
  Text,
  Box,
  ScrollArea,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Footer } from './Footer';
import { Header } from './Header';
import { Menu } from './Menu';

export interface DashboardLayoutProps {
  sidebarWidth?: number;
  [key: string]: any;
}

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
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
            fixed
            styles={{
              main: {
                background:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.white,
              },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            // footer={<Footer />}
            navbar={<Menu opened={!opened} />}
            header={
              <Header
                navbarOpened={opened}
                onNavbarOpen={() => setOpened((o) => !o)}
              />
            }
          >
            <Outlet />
          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
