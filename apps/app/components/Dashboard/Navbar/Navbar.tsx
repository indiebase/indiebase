'use client';

import { AppShell, Burger } from '@mantine/core';
import { useAtom } from 'jotai';
import { type FC } from 'react';

import { OrganizationSelect } from '~/components/OrganizationSelect';

import { ActionsBar } from './ActionsBar';
import { navbarCollapseAtom } from './navbar.atom';
import { NavMenu } from './NavMenu';

export interface DashboardNavbarProps {
  // menu: NavbarMenuTile[];
  semver?: string;
}

export const DashboardNavbar: FC<DashboardNavbarProps> = function () {
  const [opened, toggle] = useAtom(navbarCollapseAtom);

  return (
    <AppShell.Navbar p="md">
      <Burger
        opened={opened.mobile}
        onClick={() => toggle({ ...opened, mobile: !opened.mobile })}
        hiddenFrom="sm"
        size="xs"
      />

      <OrganizationSelect
        onOptionSubmit={(val) => {
          console.log(val);
        }}
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
