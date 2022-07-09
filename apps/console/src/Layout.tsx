import { FC, useMemo } from 'react';
import { Link, useRoutes } from 'react-router-dom';
import { HomePage } from './pages';
import { NotFoundPage } from './pages/404';
import { AccessPage } from './pages/Settings/';
import { useMenu } from './use-menu';
import { DashboardLayout } from '@letscollab/app-utils';
import { useProMenu } from '@letscollab-pro/console';
import { Anchor, Image, Text, Title } from '@mantine/core';
import { useQuery } from 'react-query';
import { req } from './api';

export const Layout: FC<any> = function () {
  const menu = useMenu();

  // const { isLoading, error, data, isFetching } = useQuery(['repoData'], () =>
  //   req
  //     .get('https://api.github.com/repos/tannerlinsley/react-query')
  //     .then((res) => res.data),
  // );

  return (
    <DashboardLayout
      logoHref="/"
      logo={
        <Image src="/logo.svg" fit="contain" width="150px" alt="letscollab" />
      }
      logoWidth={150}
      menu={menu}
      nav={
        <>
          <Anchor
            to="/pro"
            target="_blank"
            underline={false}
            component={Link}
            reloadDocument={false}
            style={{ color: '#ffd700', fontWeight: 700 }}
          >
            Switch Pro
          </Anchor>
        </>
      }
    />
  );
};
