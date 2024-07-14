'use client';

import { AppShell, Burger } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import { type FC } from 'react';

import { OrganizationSelect } from '~/components/OrganizationSelect';
import { reRenderPrint } from '~/utils/helper';

import { ActionsBar } from './ActionsBar';
import { NavbarMolecule } from './navbar.molecule';
import { NavMenu } from './NavMenu';

export interface AppShellNavbarProps extends React.PropsWithChildren {}

export const AppShellNavbar: FC<AppShellNavbarProps> = ({ children }) => {
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
      <ActionsBar />
      <NavMenu mt={5} />
    </AppShell.Navbar>
  );
};
