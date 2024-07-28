'use client';

import { AppShell, Burger } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import { type FC } from 'react';

import { OrganizationSelect } from '~/components/OrganizationSelect';
import { reRenderProbe } from '~/utils/helper';

import { ActionsBar } from './ActionsBar';
import { NavbarMolecule, type NavMode } from './navbar.molecule';
import { NavMenu } from './NavMenu';

export interface NavbarProps extends React.PropsWithChildren {
  mode: NavMode;
}

export const Navbar: FC<NavbarProps> = ({ mode }) => {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [opened, toggle] = useAtom(navbarMolecule.collapsedAtom);

  reRenderProbe('Navbar');

  return (
    <AppShell.Navbar p="md" data-dash-navbar>
      <Burger
        opened={opened.mobile}
        onClick={() => toggle({ ...opened, mobile: !opened.mobile })}
        hiddenFrom="sm"
        size="xs"
      />
      <OrganizationSelect
        onOptionSubmit={(val) => {}}
        searchPlaceholder="Search organization..."
        placeholder="Select organization"
        items={[
          {
            icon: 'https://randomuser.me/api/portraits/med/women/88.jpg',
            value: 'indiebase',
            label: 'indiebase',
          },
        ]}
      />
      <ActionsBar mode={mode} />
      <NavMenu mode={mode} mt={5} />
    </AppShell.Navbar>
  );
};
