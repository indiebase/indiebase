import {
  IconBusinessplan,
  IconChartPie,
  IconMessage,
} from '@tabler/icons-react';

import { type NavMenuItem } from './types';

export const collectiveMenus = [
  {
    href: '/dash/auth',
    label: 'Auth',
    leftSection: <IconBusinessplan size="1.1rem" stroke={1.5} />,
  },
  {
    href: '/dash/functions',
    label: 'Functions',
    leftSection: <IconChartPie size="1.1rem" stroke={1.5} />,
  },
  {
    href: '/dash/messaging',
    label: 'Messaging',
    leftSection: <IconMessage size="1.1rem" stroke={1.5} />,
  },
] satisfies NavMenuItem[];
