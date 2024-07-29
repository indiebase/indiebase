'use client';

import { AppShell, rem } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import React, { useRef } from 'react';
import { type FC } from 'react';

import { AppShellHeader } from '~/components/Dashboard';
import { NavbarMolecule } from '~/components/Dashboard/Navbar';
import { reRenderProbe } from '~/utils/helper';
import { useHasElement } from '~/utils/hooks';

export interface DashboardLayoutProps extends React.PropsWithChildren {}

export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const { children } = props;
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [collapsed] = useAtom(navbarMolecule.collapsedAtom);
  const ref = useRef<HTMLDivElement>(null);
  const { has } = useHasElement('[data-dash-navbar]', ref.current);
  reRenderProbe('DashboardLayout');

  const navbarProps = has && {
    width: rem(300),
    breakpoint: 'sm',
    collapsed: {
      mobile: !collapsed.mobile,
      desktop: !collapsed.desktop,
    },
  };

  return (
    <AppShell
      ref={ref}
      layout="alt"
      header={{ height: rem(65) }}
      navbar={navbarProps}
    >
      <AppShellHeader />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};
