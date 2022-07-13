import { FC, useMemo } from 'react';
import { Link, useRoutes } from 'react-router-dom';
import { HomePage } from './pages';
import { NotFoundPage } from './pages/404';
import { AccessPage } from './pages/Settings/';
import { useMenu } from './use-menu';
import { DashboardLayout } from '@letscollab/app-utils';
import { ProLayout } from '@letscollab-pro/console';
import { Anchor, Image, Text, Title } from '@mantine/core';
import { useQuery } from 'react-query';
import { req } from '@letscollab/app-utils/src/api';
import { Layout } from './Layout';

export const AppRouter: FC<any> = function () {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <AccessPage />,
        },
        {
          path: ':org',
          children: [
            {
              index: true,
              element: <AccessPage />,
            },
            // {
            //   path: ':project',
            //   children: [
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
          ],
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
    {
      path: '/pro',
      element: <ProLayout />,
      children: [
        {
          path: '*',
          element: <NotFoundPage />,
        },
        {
          path: ':org',
          children: [
            {
              path: ':project',
              element: <div>demo</div>,
              children: [
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
          ],
        },
      ],
    },
  ]);
};
