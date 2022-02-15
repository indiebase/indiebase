import React from 'react';
import { RouteProps } from 'react-router-dom';
import { NotFoundPage } from '@/components/404';
import type { Route } from '@ant-design/pro-layout/lib/typings';
import {
  SettingOutlined,
  CrownOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import { PublishPage } from '@/page/AdminDashboard/match';
import { BannerPage } from './website/BannerPage';
import { PossessionPage } from './rbac/PossessionPage';
import { RolePage } from './rbac/RolePage';
import { UserPage } from './rbac/UserPage';

type FlatRoute = Route & RouteProps;

const createFlatDashboardRoutes = function (route: Route): FlatRoute[] {
  const target: FlatRoute[] = [];
  const func = function (r: Route): any {
    const { routes, ...rest } = r;

    if (r.path) {
      target.push(rest);
    }
    if (routes) {
      for (const rr of routes) {
        func(rr);
      }
    }
  };
  func(route);
  target.push({
    path: '*',
    component: NotFoundPage,
  });
  return target;
};

export const adminDashboardRoute: Route = {
  path: '/dash',
  component: () => <div>dmeo</div>,
  exact: true,
  routes: [
    {
      name: '赛事管理',
      icon: <CrownOutlined style={{ fontSize: '15px', color: '#0665d0b3' }} />,
      routes: [
        {
          path: '/dash/match/publish',
          name: '赛事发布',
          exact: true,
          component: PublishPage,
        },
        {
          path: '/dash/match/publish1',
          name: '赛事通知',
          exact: true,
          component: PublishPage,
        },
      ],
    },
    {
      name: '站点管理',
      icon: <GlobalOutlined style={{ fontSize: '15px', color: '#0665d0b3' }} />,
      routes: [
        {
          path: '/dash/site/banner',
          name: 'Banner配置',
          component: BannerPage,
          exact: true,
        },
      ],
    },
    {
      name: '配置管理',
      icon: (
        <SettingOutlined style={{ fontSize: '15px', color: '#0665d0b3' }} />
      ),
      routes: [
        {
          path: '/dash/config/user',
          name: '用户管理',
          component: UserPage,
          exact: true,
        },
        {
          path: '/dash/config/role',
          name: '角色管理',
          component: RolePage,
          exact: true,
        },
        {
          path: '/dash/config/possession',
          name: '资源管理',
          component: PossessionPage,
          exact: true,
        },
      ],
    },
  ],
};
// export const adminDashboardRoute: Route = {
//   route: {
//     path: '/dash',
//     exact: true,
//     routes: adminDashboardRoute.routes,
//   },
// };

export const flatAdminDashboardRoutes =
  createFlatDashboardRoutes(adminDashboardRoute);
