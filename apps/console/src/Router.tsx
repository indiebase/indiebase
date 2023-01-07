import { createBrowserRouter } from 'react-router-dom';
import { HttpStatusPage } from '@letscollab-community/console-utils';
import { Layout } from './Layout';
import { OrganizationPage, AccessPage, MyPage } from './pages';
import { TwoFactorAuthPage } from './pages/My/Settings';
import { MyProfilePage } from './pages/My/Profile';

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
          element: <AccessPage />,
        },
        {
          path: 'access',
          element: <AccessPage />,
        },
      ],
    },
  ],
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MyPage />,
      },
      {
        path: 'users/:user',
        children: [
          {
            index: true,
            element: <MyPage />,
          },
          {
            path: 'settings',
            children: [
              {
                path: 'profile',
                element: <MyProfilePage />,
              },
              {
                path: '2fa',
                element: <TwoFactorAuthPage />,
              },
            ],
          },
          projectRouter,
        ],
      },
      {
        path: 'orgs/:org',
        children: [
          {
            index: true,
            element: <OrganizationPage />,
          },
          projectRouter,
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
    // element: <ProLayout />,
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
