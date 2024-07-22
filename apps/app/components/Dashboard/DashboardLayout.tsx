'use client';

import { Anchor, AppShell, rem } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React from 'react';
import { type FC } from 'react';

import { AppShellHeader } from '~/components/Dashboard';
import { NavbarMolecule } from '~/components/Dashboard/Navbar';
import { IndiebaseTextLogo } from '~/components/Icons';
import { reRenderProbe } from '~/utils/helper';

export interface DashboardLayoutProps extends React.PropsWithChildren {
  navbar?: React.ReactNode;
  header?: React.ReactNode;
}

export const IndiebaseEnvLogo: FC<any> = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return <IndiebaseTextLogo size={160} />;
    default:
      break;
  }
};

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { navbar, header, children } = props;
  const appShellHeader = header ?? (
    <AppShellHeader
      burger={!!navbar}
      logo={
        <Anchor href="/" component={Link} display="flex">
          <IndiebaseTextLogo size={160} />
        </Anchor>
      }
    />
  );
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [collapsed] = useAtom(navbarMolecule.collapsedAtom);

  reRenderProbe('DashboardLayout');

  return (
    <AppShell
      layout="alt"
      header={{ height: rem(65) }}
      navbar={
        React.isValidElement(navbar) && {
          width: rem(300),
          breakpoint: 'sm',
          collapsed: {
            mobile: !collapsed.mobile,
            desktop: !collapsed.desktop,
          },
        }
      }
    >
      {appShellHeader}
      {navbar}
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
