import { FC, ReactElement, Suspense, useState } from 'react';
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
import { ErrorBoundary } from 'react-error-boundary';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

export interface DashboardLayoutProps extends NavHeaderProps {
  sidebar: ReactElement;
}

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
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
        theme={{
          colorScheme,
          primaryColor: 'blue',
          components: {
            Button: { defaultProps: { size: 'xs' } },
          },
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
            navbar={
              <ErrorBoundary fallbackRender={() => <div />}>
                {props.sidebar}
              </ErrorBoundary>
            }
            footer={<Footer />}
            header={
              <ErrorBoundary
                onError={(err) => {
                  console.log(err);
                }}
                fallbackRender={() => <div style={{ height: 65 }} />}
              >
                <Suspense fallback={<div style={{ height: 65 }} />}>
                  <Header
                    {...props}
                    // navbarOpened={opened}
                    // onNavbarOpen={toggle}
                  />
                </Suspense>
              </ErrorBoundary>
            }
          >
            <Outlet />
          </AppShell>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
