import { FC } from 'react';
import { useRoutes } from 'react-router-dom';

import { HttpStatusPage } from '@letscollab/app-utils';
import { ProLayout } from '@letscollab-pro/console';
import { Layout } from './Layout';
import { OrganizationPage, AccessPage } from './pages';

export const AppRouter: FC<any> = function () {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        // {
        //   path: '404',
        //   element: <HttpStatusPage label="404" />,
        // },

        {
          index: true,
          element: <div>demo</div>,
        },
        {
          path: 'settings',
          children: [
            {
              path: 'profile',
              element: <div>Settings Profile</div>,
            },
          ],
        },
        {
          path: ':org',
          children: [
            {
              index: true,
              element: <OrganizationPage />,
            },
            {
              path: 'settings',
              children: [
                {
                  path: 'general',
                  element: <AccessPage />,
                },
                {
                  path: 'access',
                  element: <AccessPage />,
                },
              ],
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
