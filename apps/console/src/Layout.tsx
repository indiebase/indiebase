import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from './use-menu';
import { DashboardLayout } from '@letscollab/app-utils';
import { Anchor, Image } from '@mantine/core';
import { userProfileQuery } from '@letscollab/app-utils';
import { useAtom } from 'jotai';

export const Layout: FC<any> = function () {
  const menu = useMenu();

  const [data, dispatch] = useAtom(userProfileQuery);

  return (
    <DashboardLayout
      logoHref="/"
      logo={
        <Image src="/logo.svg" fit="contain" width="180px" alt="letscollab" />
      }
      logoWidth={180}
      menu={menu}
      orgs={data.d.orgs}
      nav={
        <>
          <Anchor
            to="/pro"
            target="_blank"
            underline={false}
            component={Link}
            reloadDocument={false}
            style={{ color: '#228be6', fontWeight: 700 }}
          >
            Switch Pro
          </Anchor>
        </>
      }
      navbarOpened={false}
    />
  );
};
