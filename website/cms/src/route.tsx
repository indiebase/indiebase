import { RouteProps } from 'react-router-dom';
import { NotFoundPage } from './components/404';
import { AdminDashboard } from './page/AdminDashboard';
import { MainPage } from './page/Home/MainPage';

export const route = [
  {
    path: '/dash',
    component: AdminDashboard,
  },
  {
    path: '/home',
    component: MainPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
