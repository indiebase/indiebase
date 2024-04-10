'use client';

import { AppShell, rem } from '@mantine/core';
import { useAtom } from 'jotai';
import { type FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { IndiebaseTextLogo } from '~/components/Icons';

import { AppShellHeader } from './Header';
import { AppShellNavbar } from './Navbar';
import { navbarCollapseAtom } from './navbar.atom';

export interface DashboardLayoutProps extends React.PropsWithChildren {}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [opened] = useAtom(navbarCollapseAtom);

  console.debug(
    '%c------------------------DashboardLayout re-render------------------------------',
    'color:green',
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
      padding={{ base: 'md', lg: 0 }}
    >
      <AppShellHeader logo={<IndiebaseTextLogo size={160} />} />
      <AppShellNavbar />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
