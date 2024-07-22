'use client';

import { type FC } from 'react';

import { DashboardLayout } from '~/components/Dashboard';

export interface AppShellProps extends React.PropsWithChildren {
  navbar: React.ReactNode;
}

const CreateLayout: FC<AppShellProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default CreateLayout;
