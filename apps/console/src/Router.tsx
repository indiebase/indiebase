import { FC, useMemo } from 'react';
import { Link, useRoutes } from 'react-router-dom';
import { HomePage } from './pages';
import { NotFoundPage } from './pages/404';
import { AccessPage } from './pages/Settings/';
import { useMenu } from './use-menu';
import { DashboardLayout } from '@letscollab/app-utils';
import { useProMenu } from '@letscollab-pro/console';
import { Anchor, Image, Text, Title } from '@mantine/core';
import { useQuery } from 'react-query';
import { req } from './api';
import { Layout } from './Layout';

export const AppRouter: FC<any> = function () {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
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
        {
          path: 'projects',
          element: <AccessPage />,
          children: [
            {
              path: 'settings',
            },
          ],
        },
      ],
    },
    // {
    //   path: '/pro',
    //   element: ProLayout,
    //   children: [
    //     {
    //       path: '*',
    //       element: <NotFoundPage />,
    //     },
    //     {
    //       path: 'home',
    //       element: <HomePage />,
    //     },
    //     {
    //       path: 'settings',
    //       children: [
    //         {
    //           path: 'access',
    //           element: <AccessPage />,
    //         },
    //       ],
    //     },
    //   ],
    // },
  ]);
};
