'use client';

import { Anchor, AppShell, rem } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { type FC } from 'react';

import {
  DashboardHeader,
  DashboardNavbar,
  NavbarMolecule,
} from '~/components/Dashboard';
import { IndiebaseTextLogo } from '~/components/Icons';

export interface DashboardLayoutProps extends React.PropsWithChildren {}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [opened] = useAtom(navbarMolecule.collapsedAtom);

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
          <Anchor href="/" component={Link} display="flex">
            <IndiebaseTextLogo size={160} />
          </Anchor>
        }
      />
      <DashboardNavbar />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
