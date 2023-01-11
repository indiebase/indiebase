import { FC, ReactElement, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, useMantineTheme } from '@mantine/core';
import { Header, NavHeaderProps } from './Header';
import { ErrorBoundary } from 'react-error-boundary';
import { Footer } from './Footer';

export interface DashboardLayoutProps extends NavHeaderProps {
  sidebar: ReactElement;
}

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const theme = useMantineTheme();

  console.log(theme);

  console.log('------------------------------------------------------');

  return (
    <AppShell
      fixed
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.white,
          // paddingLeft: 0,
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
            <Header {...props} />
          </Suspense>
        </ErrorBoundary>
      }
    >
      <Outlet />
    </AppShell>
  );
};
