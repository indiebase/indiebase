'use client';

import { type FC } from 'react';

import { ClientOnly } from '~/components/ClientOnly';
import { DashboardLayout } from '~/components/Dashboard';
import { reRenderProbe } from '~/utils/helper';

export type DashboardProps = React.PropsWithChildren;

const Layout: FC<DashboardProps> = ({ children }) => {
  reRenderProbe('Dashboard');

  return (
    <ClientOnly>
      <DashboardLayout>{children}</DashboardLayout>
    </ClientOnly>
  );
};

export default Layout;
