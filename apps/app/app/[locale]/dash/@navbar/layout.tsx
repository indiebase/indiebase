'use client';

import { AppShell, Burger } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import { type FC } from 'react';

import { reRenderPrint } from '~/utils/helper';

import { NavbarMolecule } from './_components/navbar.molecule';

export interface NavbarLayoutProps extends React.PropsWithChildren {}

const NavbarLayout: FC<NavbarLayoutProps> = ({ children }) => {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [opened, toggle] = useAtom(navbarMolecule.collapsedAtom);

  reRenderPrint('NavbarLayout');

  return (
    <AppShell.Navbar p="md">
      <Burger
        opened={opened.mobile}
        onClick={() => toggle({ ...opened, mobile: !opened.mobile })}
        hiddenFrom="sm"
        size="xs"
      />
      {children}
    </AppShell.Navbar>
  );
};

export default NavbarLayout;
