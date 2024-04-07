import { type RouteObject, createBrowserRouter } from 'react-router-dom';

const projectRouter = {
  path: ':project',
  children: [
    {
      index: true,
      element: <div>projects</div>,
    },
    {
      path: 'settings',
      children: [
        {
          path: 'general',
          element: <div>general</div>,
        },
        {
          path: 'access',
          element: <div>access</div>,
        },
      ],
    },
  ],
} satisfies RouteObject;

const routes = [
  {
    path: '/',
    lazy: () => import('./components/DashboardLayout'),
    children: [
      {
        index: true,
        lazy: () => import('./pages/MY'),
      },
      {
        path: '2fa',
        lazy: () => import('./pages/2FA'),
      },
      {
        path: 'users/:user',
        element: <div>user</div>,
      },
      {
        path: 'orgs/:org',
        children: [
          {
            index: true,
            lazy: () => import('./pages/2FA'),
          },
        ],
      },
      {
        path: 'new',
        children: [
          {
            path: 'org',
            children: [
              {
                index: true,
                lazy: () => import('./pages/New/Org'),
              },
            ],
          },
        ],
      },
      {
        path: 'invite',
        children: [
          {
            index: true,
            lazy: () => import('./pages/New/Invite.tsx'),
          },
        ],
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
});
