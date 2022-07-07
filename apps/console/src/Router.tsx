import { FC, useMemo } from 'react';
import { useRoutes } from 'react-router-dom';
import { HomePage } from './pages';
import { NotFoundPage } from './pages/404';
import { AccessPage } from './pages/Settings/';
import { useMenu } from './use-menu';
import { DashboardLayout } from '@letscollab/app-utils';
import { useProMenu } from '@letscollab-pro/console';
import { Divider, Image, Text, Title } from '@mantine/core';

export const AppRouter: FC<any> = function () {
  const menu = useMenu();
  const proMenu = useProMenu();

  const Layout = useMemo(
    () => (
      <DashboardLayout
        logoHref="/"
        logo={
          <Image src="/logo.svg" fit="contain" width="150px" alt="letscollab" />
        }
        menu={menu}
      />
    ),
    [menu],
  );

  const ProLayout = useMemo(
    () => (
      <DashboardLayout
        logoHref="/pro"
        logo={
          <Title order={1}>
            <Text
              inherit
              weight={700}
              component="span"
              variant="gradient"
              gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
            >
              letscollab
            </Text>
            <Text
              inherit
              ml={7}
              component="span"
              variant="gradient"
              gradient={{ from: '#d111e9', to: '#bfb715', deg: 45 }}
              style={{ fontSize: 20 }}
              weight={700}
            >
              Pro
            </Text>
          </Title>
        }
        menu={proMenu}
      />
    ),
    [proMenu],
  );

  return useRoutes([
    {
      path: '/',
      element: Layout,
      children: [
        {
          path: '*',
          element: <NotFoundPage />,
        },
        {
          path: 'home',
          element: <HomePage />,
        },
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
    {
      path: '/pro',
      element: ProLayout,
      children: [
        {
          path: '*',
          element: <NotFoundPage />,
        },
        {
          path: 'home',
          element: <HomePage />,
        },
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
  ]);
};
