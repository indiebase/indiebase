'use client';

import { Box, type MantineStyleProps, NavLink } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';

import { KEYS } from '~/constants';
import { LocalStore } from '~/utils';

import { NavbarMolecule } from './navbar.molecule';
import { type NavMenuItem } from './types';

interface NavMenuProps extends MantineStyleProps {}

const BaaSMenu = function () {};

export const MenuList: FC<{
  items: NavMenuItem[];
  defaultOpened?: boolean;
  index?: number;
}> = function ({ items, index }) {
  const pathname = usePathname();

  return items?.map((item) => {
    const isDirectory = item.children;
    const opened =
      isDirectory &&
      LocalStore.get<string[]>(KEYS.v0_expanded_nav_menus)?.includes?.(
        item.href,
      );

    return (
      <NavLink
        fw={index === 0 ? 600 : undefined}
        style={{ borderRadius: 'var(--mantine-radius-default)' }}
        component={Link}
        key={item.href}
        href={item.href}
        label={item.label}
        onChange={async (value) => {
          if (value) {
            LocalStore.concat(KEYS.v0_expanded_nav_menus, item.href);
          } else {
            LocalStore.remove(KEYS.v0_expanded_nav_menus, item.href);
          }
        }}
        // defaultOpened={opened}
        leftSection={item.leftSection}
        childrenOffset={isDirectory ? 13 : undefined}
        children={isDirectory ? <MenuList items={item.children} /> : null}
      />
    );
  });
};

export const NavMenu: FC<NavMenuProps> = function (props) {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [value] = useAtom(navbarMolecule.menusAtom);

  return value.state === 'hasData' ? (
    <Box {...props}>
      <MenuList items={value.data} index={0} />
    </Box>
  ) : null;
};
