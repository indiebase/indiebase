import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { DashboardLayout } from './components/Layout';
import { HomePage } from './pages';

export const AppRouter: FC<any> = function () {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'home',
          element: <HomePage />,
        },
      ],
    },
  ]);
};
