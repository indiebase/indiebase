'use client';

import { useMolecule } from 'bunshi/react';
import { type FC } from 'react';

import { OrganizationSelect } from '~/components/OrganizationSelect';

import { ActionsBar } from './ActionsBar';
import { NavbarMolecule } from './navbar.molecule';
import { NavMenu } from './NavMenu';

export interface DashboardNavbarProps {
  semver?: string;
}

const DashboardNavbar: FC<DashboardNavbarProps> = function ({ children }) {
  const navbarMolecule = useMolecule(NavbarMolecule);

  return (
    <>
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
    </>
  );
};

export default DashboardNavbar;
