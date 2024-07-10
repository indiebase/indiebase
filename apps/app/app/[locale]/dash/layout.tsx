'use client';

import { Anchor, AppShell, rem } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { type FC } from 'react';

import { DashboardHeader, NavbarMolecule } from '~/components/Dashboard';
import { IndiebaseTextLogo } from '~/components/Icons';

export interface DashboardLayoutProps extends React.PropsWithChildren {
  navbar: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, navbar }) => {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [opened] = useAtom(navbarMolecule.collapsedAtom);

  console.log(navbar);

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
    >
      <DashboardHeader
        logo={
          <Anchor href="/" component={Link} display="flex">
            <IndiebaseTextLogo size={160} />
          </Anchor>
        }
      />
      {navbar}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
