'use client';

import { Navbar } from '~/components/Dashboard/Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Navbar mode="backend" />
      {children}
    </>
  );
}
