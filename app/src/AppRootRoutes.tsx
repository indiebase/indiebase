import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { MainPage } from '@/home';
import { DashboardLayout } from '@/dashboard/layout/DashboardLayout';

export const AppRootRoutes: FC<any> = function () {
  return useRoutes([
    {
      path: '/home',
      element: <MainPage />,
      children: [
        {
          path: 'dashboard',
          element: <div></div>,
        },
        { path: 'tasks', element: <div></div> },
      ],
    },
    { path: '/dashboard', element: <DashboardLayout /> },
  ]);
};
