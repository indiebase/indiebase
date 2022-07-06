import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { DashboardLayout } from './components/Layout';
import { HomePage } from './pages';
import { NotFoundPage } from './pages/404';
import { AccessPage } from './pages/Settings/';

export const AppRouter: FC<any> = function () {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: '*',
          element: <NotFoundPage />,
        },
        {
          path: 'home',
          element: <HomePage />,
        },
        {
          path: 'settings',
          children: [
            {
              path: 'access',
              element: <AccessPage />,
            },
          ],
        },
      ],
    },
  ]);
};
