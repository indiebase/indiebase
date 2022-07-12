import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';

import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
  useMantineTheme,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Header, NavHeaderProps } from './Header';
import { Menu, MenuNode } from './Menu';

export interface DashboardLayoutProps extends NavHeaderProps {
  menu: MenuNode[];
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
        theme={{ colorScheme, primaryColor: 'blue' }}
        defaultProps={{
          Button: { size: 'xs' },
        }}
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
            navbar={<Menu menu={props.menu} opened={!opened} />}
            header={
              <Header
                {...props}
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
