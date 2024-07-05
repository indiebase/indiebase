'use client';

import { Box, type MantineStyleProps, NavLink } from '@mantine/core';
import {
  IconApps,
  IconCloud,
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
import { type FC } from 'react';

import { NavbarMolecule } from './navbar.molecule';

interface NavMenuProps extends MantineStyleProps {}

const BaaSMenu = function () {};

export const NavMenu: FC<NavMenuProps> = function (props) {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [expanded, toggle] = useAtom(navbarMolecule.expandedAllMenusAtom);
  const [mode, setMode] = useAtom(navbarMolecule.modeAtom);

  return (
    <Box {...props}>
      <NavLink
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
      </NavLink>
    </Box>
  );
};
