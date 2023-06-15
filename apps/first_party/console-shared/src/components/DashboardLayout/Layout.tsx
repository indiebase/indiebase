import { FC, ReactElement, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppShell, Box, useMantineTheme } from '@mantine/core';
import { Header, NavHeaderProps } from './Header';
import { ErrorBoundary } from 'react-error-boundary';
import { Footer } from './Footer';

export interface DashboardLayoutProps {
  sidebar: ReactElement;
  header?: ReactElement;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  header,
  sidebar,
}) => {
  const theme = useMantineTheme();
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
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <ErrorBoundary fallbackRender={() => <div />}>{sidebar}</ErrorBoundary>
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
            {header}
          </Suspense>
        </ErrorBoundary>
      }
    >
      <Box mt={30}>
        <Outlet />
      </Box>
    </AppShell>
  );
};
