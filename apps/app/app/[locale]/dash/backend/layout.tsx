'use client';

import { BackendNavbar } from '~/components/Dashboard/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <BackendNavbar />
      {children}
    </>
  );
}
