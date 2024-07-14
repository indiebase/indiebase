'use client';

import { type FC } from 'react';

import { AppShellNavbar } from '~/components/Dashboard/Navbar';

export interface AppShellProps extends React.PropsWithChildren {
  navbar: React.ReactNode;
}

const NavbarLayout: FC<AppShellProps> = ({ children }) => {
  return <AppShellNavbar />;
};

export default NavbarLayout;
