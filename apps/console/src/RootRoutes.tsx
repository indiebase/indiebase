import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { DashboardLayout } from '@/layout/DashboardLayout';

export const RootRoutes: FC<any> = function () {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
    },
  ]);
};
