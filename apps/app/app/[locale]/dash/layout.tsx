'use client';

import { type FC } from 'react';

import { ClientOnly } from '~/components/ClientOnly';
import { DashboardLayout } from '~/components/Dashboard';
import { reRenderProbe } from '~/utils/helper';

export interface DashboardProps extends React.PropsWithChildren {}

const Dashboard: FC<DashboardProps> = ({ children }) => {
  reRenderProbe('Dashboard');

  return (
    <ClientOnly>
      <DashboardLayout>{children}</DashboardLayout>
    </ClientOnly>
  );
};

export default Dashboard;
