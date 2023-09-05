import { RouteObject, createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    lazy: () => import('./components/DashboardLayout'),
    children: [
      {
        path: '2fa',
        lazy: () => import('./pages/MY/2FA'),
      },
    ],
  },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
});
