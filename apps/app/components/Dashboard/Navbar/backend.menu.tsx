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

import { type NavMenuItem } from './types';

export const baasMenus = [
  {
    href: '/dash/auth',
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
