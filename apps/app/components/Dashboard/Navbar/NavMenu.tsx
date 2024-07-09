'use client';

import { Box, type MantineStyleProps, NavLink } from '@mantine/core';
import {
  IconApps,
  IconCloudCog,
  IconDatabase,
  IconDatabaseSmile,
  IconFileDatabase,
  IconFunction,
  IconMessage,
  IconServerBolt,
  IconSettings2,
  IconUserSquareRounded,
} from '@tabler/icons-react';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC } from 'react';

import { KEYS } from '~/constants';
import { LocalStore } from '~/utils';

import { NavbarMolecule } from './navbar.molecule';

interface NavMenuProps extends MantineStyleProps {}

export interface NavMenuItem {
  href: string;
  label: string;
  leftSection?: JSX.Element;
  children?: NavMenuItem[];
}

const BaaSMenu = function () {};

export const MenuList: FC<{ items: NavMenuItem[]; defaultOpened?: boolean }> =
  function ({ items, defaultOpened }) {
    const { expandedMenusAtom } = useMolecule(NavbarMolecule);
    const [include, mutex] = useAtom(expandedMenusAtom);
    const pathname = usePathname();
    return items?.map((item) => {
      const isDirectory = item.children;

      return (
        <NavLink
          component={Link}
          key={item.href}
          href={item.href}
          label={item.label}
          onChange={async (value) => {
            if (value) {
              LocalStore.concat(KEYS.v0_expanded_all_nav_menus, item.href);
            } else {
              LocalStore.remove(KEYS.v0_expanded_all_nav_menus, item.href);
            }
          }}
          defaultOpened={LocalStore.get<string[]>(
            KEYS.v0_expanded_all_nav_menus,
          )?.includes(item.href)}
          leftSection={item.leftSection}
          childrenOffset={13}
          children={
            isDirectory ? (
              <MenuList
                defaultOpened={new RegExp(item.href).test(pathname)}
                items={item.children}
              />
            ) : null
          }
        />
      );
    });
  };

export const NavMenu: FC<NavMenuProps> = function (props) {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [mode, setMode] = useAtom(navbarMolecule.modeAtom);
  const baasMenus = [
    {
      href: 'auth',
      label: 'Auth',
      leftSection: <IconUserSquareRounded size="1.1rem" stroke={1.5} />,
    },
    {
      href: '/dash/functions',
      label: 'Functions',
      leftSection: <IconFunction size="1.1rem" stroke={1.5} />,
    },
    {
      href: '/dash/messaging',
      label: 'Messaging',
      leftSection: <IconMessage size="1.1rem" stroke={1.5} />,
    },
    {
      href: '/dash/data',
      label: 'Data',
      leftSection: <IconDatabaseSmile size="1.1rem" stroke={1.5} />,
      children: [
        {
          href: '/dash/data/storage',
          label: 'Storage',
          leftSection: <IconFileDatabase size="1.1rem" stroke={1.5} />,
        },
        {
          href: '/dash/data/database',
          label: 'Database',
          leftSection: <IconDatabase size="1.1rem" stroke={1.5} />,
        },
        {
          href: '/dash/data/kv',
          label: 'Key-Value',
          leftSection: <IconCloudCog size="1.1rem" stroke={1.5} />,
        },
        {
          href: '/dash/data/sync',
          label: 'Sync',
          leftSection: <IconServerBolt size="1.1rem" stroke={1.5} />,
        },
      ],
    },
    {
      href: '/dash/extensions',
      label: 'Extensions',
      leftSection: <IconApps size="1.1rem" stroke={1.5} />,
    },
    {
      href: '/dash/settings',
      label: 'Settings',
      leftSection: <IconSettings2 size="1.1rem" stroke={1.5} />,
      children: [
        {
          href: '/dash/settings/general',
          label: 'General',
        },
        {
          href: '/dash/settings/members',
          label: 'Members',
        },
        {
          href: '/settings/security',
          label: 'Security',
        },
      ],
    },
  ] satisfies NavMenuItem[];

  return (
    <Box {...props}>
      <MenuList items={baasMenus} />
      {/* <NavLink
        style={{ borderRadius: 'var(--mantine-radius-default)' }}
        href="/dash"
        label="Auth"
        leftSection={<IconUserSquareRounded size="1.1rem" stroke={1.5} />}
        fw={600}
      />
      <NavLink
        href="#required-for-focus"
        label="Functions"
        leftSection={<IconFunction size="1.1rem" stroke={1.5} />}
        fw={600}
        defaultOpened={expanded}
      />
      <NavLink
        href="#required-for-focus"
        label="Messaging"
        leftSection={<IconMessage size="1.1rem" stroke={1.5} />}
        fw={600}
        defaultOpened={expanded}
      />
      <NavLink
        href="#required-for-focus"
        label="Data"
        leftSection={<IconDatabaseSmile size="1.1rem" stroke={1.5} />}
        childrenOffset={13}
        fw={600}
        defaultOpened={expanded}
      >
        <NavLink
          href="#required-for-focus"
          label="Storage"
          leftSection={<IconFileDatabase size="1.1rem" stroke={1.5} />}
        />
        <NavLink
          href="#required-for-focus"
          label="Database"
          leftSection={<IconDatabase size="1.1rem" stroke={1.5} />}
        />
        <NavLink
          href="#required-for-focus"
          label="Key-Value"
          leftSection={<IconCloudCog size="1.1rem" stroke={1.5} />}
        />
        <NavLink
          href="#required-for-focus"
          label="Sync"
          leftSection={<IconServerBolt size="1.1rem" stroke={1.5} />}
        />
      </NavLink>
      <NavLink
        href="#required-for-focus"
        label="Extensions"
        leftSection={<IconApps size="1.1rem" stroke={1.5} />}
        fw={600}
        defaultOpened={expanded}
      />
      <NavLink
        href="#required-for-focus"
        label="Settings"
        leftSection={<IconSettings2 size="1.1rem" stroke={1.5} />}
        childrenOffset={13}
        fw={600}
        defaultOpened={expanded}
      >
        <NavLink label="General" href="#required-for-focus" />
        <NavLink label="Members" href="#required-for-focus" />
        <NavLink label="Security" href="#required-for-focus" />
      </NavLink> */}
    </Box>
  );
};
