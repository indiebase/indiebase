'use client';

import { Anchor, AppShell, rem } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { type FC } from 'react';

import { ClientOnly } from '~/components/ClientOnly/ClientOnly';
import { DashboardHeader } from '~/components/Dashboard';
import { IndiebaseTextLogo } from '~/components/Icons';
import { reRenderPrint } from '~/utils/helper';

import { NavbarMolecule } from './@navbar/navbar.molecule';

export interface DashboardLayoutProps extends React.PropsWithChildren {
  navbar: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, navbar }) => {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [collapsed] = useAtom(navbarMolecule.collapsedAtom);

  reRenderPrint('DashboardLayout');

  console.log(children, navbar, '----------------------------');

  return (
    <AppShell
      layout="alt"
      header={{ height: rem(65) }}
      navbar={{
        width: rem(300),
        breakpoint: 'sm',
        collapsed: {
          mobile: !collapsed.mobile,
          desktop: !collapsed.desktop,
        },
      }}
    >
      <DashboardHeader
        logo={
          <Anchor href="/" component={Link} display="flex">
            <IndiebaseTextLogo size={160} />
          </Anchor>
        }
      />
      {/* {navbar} */}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default DashboardLayout;
