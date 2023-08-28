import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('./components/DashboardLayout'),
  },
]);
