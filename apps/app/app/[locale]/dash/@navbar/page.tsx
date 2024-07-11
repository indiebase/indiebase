'use client';

import { type FC } from 'react';

import { OrganizationSelect } from '~/components/OrganizationSelect';

import { ActionsBar } from './_components/ActionsBar';
import { NavMenu } from './_components/NavMenu';

export interface DashboardNavbarProps {
  semver?: string;
}

const DashboardNavbar: FC<DashboardNavbarProps> = function () {
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
