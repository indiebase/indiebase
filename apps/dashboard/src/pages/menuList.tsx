import { IconBrandChrome, IconDashboard, IconHelp } from '@tabler/icons';
import { MenuItemProps } from '@/layout/DashboardLayout/Sidebar/Menu';

export const menuList: MenuItemProps[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
      {
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        path: '/dashboard/default',
        icon: IconDashboard,
        showTitleBar: false,
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
        path: '/sample-page',
        icon: IconBrandChrome,
        showTitleBar: false,
      },
      {
        id: 'documentation',
        title: 'Documentation',
        type: 'item',
        uri: 'https://codedthemes.gitbook.io/berry/',
        icon: IconHelp,
        target: true,
      },
    ],
  },
];
