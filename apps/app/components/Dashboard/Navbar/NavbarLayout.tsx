'use client';

import { AppShell, Burger } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import { type FC, useEffect } from 'react';

import { reRenderProbe } from '~/utils/helper';

import { NavbarMolecule } from './navbar.molecule';

export const NavbarLayout: FC<React.PropsWithChildren> = ({ children }) => {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [opened, toggle] = useAtom(navbarMolecule.collapsedAtom);
  const [_, hide] = useAtom(navbarMolecule.hiddenAtom);

  reRenderProbe('Navbar');
  useEffect(() => {
    hide(false);
    return () => {
      hide(true);
    };
  }, []);

  return (
    <>
      <AppShell.Navbar p="md">
        <Burger
          opened={opened.mobile}
          onClick={() => toggle({ ...opened, mobile: !opened.mobile })}
          hiddenFrom="sm"
          size="xs"
        />
        {children}
      </AppShell.Navbar>
    </>
  );
};
