import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { MainPage } from '@/home';
import { DashboardLayout } from '@/dashboard/layout/DashboardLayout';

export const AppRootRoutes: FC<any> = function () {
  return useRoutes([
    {
      path: '/',
      children: [{ path: 'home', element: <MainPage /> }],
    },
    { path: '/dashboard', element: <DashboardLayout /> },
  ]);
};
