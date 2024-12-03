'use client';

import { type FC } from 'react';

import { OrganizationSelect } from '../../OrganizationSelect';
import { ActionsBar } from './ActionsBar';
import { NavbarLayout } from './NavbarLayout';
import { NavMenu } from './NavMenu';

export const CollectiveNavbar: FC = () => {
  return (
    <NavbarLayout>
      <OrganizationSelect
        onOptionSubmit={(val) => {
          console.debug(val);
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
      <ActionsBar mode="collective" />
      <NavMenu mode="collective" mt={5} />
    </NavbarLayout>
  );
};
