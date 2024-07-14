'use client';

import { Box, type MantineStyleProps, NavLink } from '@mantine/core';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC, useState } from 'react';

import { KEYS } from '~/constants';
import { LocalStore } from '~/utils';
import { useSetStorageAtom } from '~/utils/atoms';
import { isWithinPath } from '~/utils/helper';

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
  const molecule = useMolecule(NavbarMolecule);
  const [_, { remove, add, has }] = useSetStorageAtom(
    molecule.expandedMenusAtom,
  );

  return items?.map((item) => {
    const isDirectory = item.children && item.children.length > 0;
    const opened = isDirectory && has(item.href);

    return (
      <NavLink
        fw={index === 0 ? 600 : undefined}
        style={{ borderRadius: 'var(--mantine-radius-default)' }}
        component={Link}
        key={item.href}
        href={item.href}
        label={item.label}
        opened={opened}
        onClick={() => {
          if (isDirectory) {
            if (opened) {
              remove(item.href);
            } else {
              add(item.href);
            }
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

  return (
    <Box {...props}>
      <MenuList items={value} index={0} />
    </Box>
  );
};
