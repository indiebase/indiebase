'use client';

import { Box, type MantineStyleProps, NavLink } from '@mantine/core';
import {
  IconCloud,
  IconCloudCog,
  IconDatabase,
  IconDatabaseSmile,
  IconFileDatabase,
  IconFunction,
  IconMessage,
  IconSettings2,
  IconUserSquareRounded,
} from '@tabler/icons-react';
import { type FC } from 'react';

// import { expandedNavMenusAtom } from './navbar.atom';

interface NavMenuProps extends MantineStyleProps {}

export const NavMenu: FC<NavMenuProps> = function (props) {
  const expanded = true;
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
        label="Cloud"
        leftSection={<IconCloud size="1.1rem" stroke={1.5} />}
        childrenOffset={13}
        fw={600}
        defaultOpened={expanded}
      >
        <NavLink
          href="#required-for-focus"
          label="Functions"
          leftSection={<IconFunction size="1.1rem" stroke={1.5} />}
        />
      </NavLink>
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
          label="Remote config"
          leftSection={<IconCloudCog size="1.1rem" stroke={1.5} />}
        />
      </NavLink>
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
        <NavLink label="Third child link" href="#required-for-focus" />
      </NavLink>
    </Box>
  );
};
