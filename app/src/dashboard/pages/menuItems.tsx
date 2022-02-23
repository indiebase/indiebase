import { IconBrandChrome, IconDashboard, IconHelp } from '@tabler/icons';

export const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        icon: IconDashboard,
        breadcrumbs: false,
      },
    ],
  },
  {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        icon: IconBrandChrome,
        breadcrumbs: false,
      },
      {
        id: 'documentation',
        title: 'Documentation',
        type: 'item',
        url: 'https://codedthemes.gitbook.io/berry/',
        icon: IconHelp,
        external: true,
        target: true,
      },
    ],
  },
];
