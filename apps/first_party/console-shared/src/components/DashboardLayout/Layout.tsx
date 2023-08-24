import { FC, ReactElement, Suspense } from 'react';
import { AppShell, Box, useMantineTheme } from '@mantine/core';
import { Header, NavHeaderProps } from './Header';
// import { ErrorBoundary } from 'react-error-boundary';
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
      // fixed
      styles={{
        main: {},
      }}
    >
      <Box mt={30}>{/* <Outlet /> */}</Box>
    </AppShell>
  );
};
