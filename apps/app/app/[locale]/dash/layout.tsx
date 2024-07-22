'use client';

import { type FC } from 'react';

import { ClientOnly } from '~/components/ClientOnly';
import { reRenderProbe } from '~/utils/helper';

export interface DashboardProps extends React.PropsWithChildren {}

const Dashboard: FC<DashboardProps> = ({ children }) => {
  reRenderProbe('Dashboard');

  return <ClientOnly>{children}</ClientOnly>;
};

export default Dashboard;
