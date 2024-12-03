'use client';

import { type FC } from 'react';

import { CollectiveNavbar } from '~/components/Dashboard/Navbar';

export type CollectiveLayoutProps = React.PropsWithChildren;

const CollectiveLayout: FC<CollectiveLayoutProps> = ({ children }) => {
  return (
    <>
      <CollectiveNavbar />
      {children}
    </>
  );
};

export default CollectiveLayout;
