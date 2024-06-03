'use client';

import { AppShell, Container, rem } from '@mantine/core';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { type FC } from 'react';

import {
  DashboardHeader,
  DashboardNavbar,
  navbarCollapseAtom,
} from '~/components/Dashboard';
import { IndiebaseTextLogo } from '~/components/Icons';

export interface DashboardLayoutProps extends React.PropsWithChildren {}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [opened] = useAtom(navbarCollapseAtom);

  console.warn(
    '------------------------DashboardLayout re-render------------------------------',
  );

  return (
    <AppShell
      layout="alt"
      header={{ height: rem(65) }}
      navbar={{
        width: rem(300),
        breakpoint: 'sm',
        collapsed: { mobile: !opened.mobile, desktop: !opened.desktop },
      }}
      pt="lg"
    >
      <DashboardHeader
        logo={
          <Link href="/">
            <IndiebaseTextLogo size={160} />
          </Link>
        }
      />
      <DashboardNavbar />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
