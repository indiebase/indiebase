import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@letscollab/console-utils';
import { Anchor, Image } from '@mantine/core';
import { CommunitySidebar } from './sidebar';

export const Layout: FC<any> = function () {
  console.log('%c--------------Layout render------------------', 'color:green');

  return (
    <>
      <DashboardLayout
        logoHref="/"
        logo={
          <Image src="/logo.svg" fit="contain" width="180px" alt="letscollab" />
        }
        logoWidth={180}
        sidebar={<CommunitySidebar />}
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
    </>
  );
};
