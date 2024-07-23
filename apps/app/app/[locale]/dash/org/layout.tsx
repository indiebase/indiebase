'use client';

import { type FC } from 'react';

import { DashboardLayout } from '~/components/Dashboard';
import { AppShellNavbar } from '~/components/Dashboard/Navbar';

export interface BackendLayoutProps extends React.PropsWithChildren {}

const BackendLayout: FC<BackendLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout navbar={<AppShellNavbar mode="backend" />}>
      {children}
    </DashboardLayout>
  );
};

export default BackendLayout;
