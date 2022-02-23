import { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { MainPage } from '@/home';

export const AppRootRoutes: FC<any> = function () {
  return useRoutes([
    {
      path: '/home',
      element: <MainPage />,
      children: [
        {
          path: 'dashboard',
          element: <MainPage />,
        },
        { path: 'tasks', element: <div></div> },
      ],
    },
    { path: '/dashboard', element: <div></div> },
  ]);
};
