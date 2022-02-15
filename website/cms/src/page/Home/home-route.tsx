import { NotFoundPage } from '@/components/404';
import { Route } from '@ant-design/pro-layout/lib/typings';
import { RouteProps } from 'react-router-dom';

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

export const mainRoute: Route = {
  path: '/home',
  exact: true,
  // component: () => {
  //   return <div style={{ height: 10000, background: 'red' }}></div>;
  // },
  routes: [
    {
      name: '学科竞赛',
      path: '/home/match',
      // icon: <UserOutlined />,
      // routes: [
      //   {
      //     path: '/dash/user/user-manager',
      //     name: '用户管理',
      //     component: UserManager,
      //     exact: true,
      //   },
      //   {
      //     path: '/dash/user/payment-manager',
      //     name: '订单管理',
      //     // component: AppManager,
      //     component: PaymentsManager,
      //     exact: true,
      //   },
      // ],
    },
    {
      name: '科协',
      path: '/home/association',
      // icon: <AppstoreOutlined />,
      // routes: [
      //   {
      //     path: '/dash/app/app-manager',
      //     name: '应用管理',
      //     component: AppManager,
      //     exact: true,
      //   },
      // ],
    },
    {
      name: '双创指导中心',
      path: '/home/guide-center',
      // icon: <ToolOutlined />,
      // routes: [
      //   {
      //     path: '/dash/tool/app-update',
      //     name: '更新管理',
      //     exact: true,
      //   },
      //   {
      //     path: '/dash/tool/entry-notification',
      //     name: '初屏通知',
      //     exact: true,
      //   },
      //   {
      //     path: '/dash/tool/tiny',
      //     name: '小工具',
      //     exact: true,
      //   },
      // ],
    },
    {
      name: '科创部',
      path: '/home/tech-part',
    },
    {
      name: '科创工作室',
      path: '/home/tech-studio',
    },
  ],
};

export const flatHomeRoutes = createFlatDashboardRoutes(mainRoute);
