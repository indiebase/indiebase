import React, { type ComponentProps } from 'react';
import clsx from 'clsx';
import { Header as MantineHeader } from '@mantine/core';
import {
  useNavbarMobileSidebar,
  useHideableNavbar,
  useThemeConfig,
} from '@docusaurus/theme-common';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import type { Props } from '@theme/Navbar/Layout';

function NavbarBackdrop(props: ComponentProps<'div'>) {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx('navbar-sidebar__backdrop', props.className)}
    />
  );
}

export default function NavbarLayout({ children }: Props): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const {
    navbar: { hideOnScroll },
  } = useThemeConfig();
  const { isNavbarVisible } = useHideableNavbar(hideOnScroll);
  return (
    <MantineHeader
      fixed
      sx={{
        borderBottom: 'unset',
        backdropFilter: 'saturate(180%) blur(10px)',
        backgroundColor: 'hsla(0,0%,100%,.7)',
        alignItems: 'center',
      }}
      height={70}
      p="md"
    >
      {children}
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </MantineHeader>
  );
}
