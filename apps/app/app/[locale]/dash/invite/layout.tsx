'use client';

import { type FC } from 'react';

import { DashboardLayout } from '~/components/Dashboard';

export interface BackendLayoutProps extends React.PropsWithChildren {}

const InviteLayout: FC<BackendLayoutProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default InviteLayout;
