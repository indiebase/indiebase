'use client';

import { type FC } from 'react';

import { DashboardLayout } from '~/components/Dashboard';
import { AppShellNavbar } from '~/components/Dashboard/Navbar';

export interface CollectiveLayoutProps extends React.PropsWithChildren {}

const CollectiveLayout: FC<CollectiveLayoutProps> = ({ children }) => {
  return (
    <DashboardLayout navbar={<AppShellNavbar mode="collective" />}>
      {children}
    </DashboardLayout>
  );
};

export default CollectiveLayout;
