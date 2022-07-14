import { FC } from 'react';
import { useRoutes } from 'react-router-dom';

import { HttpStatusPage } from '@letscollab/app-utils';
import { ProLayout } from '@letscollab-pro/console';
import { Layout } from './Layout';
import { OrganizationPage, AccessPage } from './pages';

export const AppRouter: FC<any> = function () {
  return useRoutes([
    {
      path: '/404',
      element: <HttpStatusPage label="404" />,
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <div>demo</div>,
        },
        {
          path: ':org',
          children: [
            {
              index: true,
              element: <OrganizationPage />,
            },
            {
              path: ':project',
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
        {
          path: '*',
          element: <HttpStatusPage label="404" />,
        },
      ],
    },
    {
      path: '/pro',
      element: <ProLayout />,
      children: [
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
        {
          path: '*',
          element: <HttpStatusPage label="404" />,
        },
      ],
    },
  ]);
};
