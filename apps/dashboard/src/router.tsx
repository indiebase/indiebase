import { RouteObject, createBrowserRouter } from 'react-router-dom';

const routes = [
  {
    path: '/',
    lazy: () => import('./components/DashboardLayout'),
  },
] satisfies RouteObject[];

export const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
});
