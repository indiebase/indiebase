import { useMemo } from 'react';
import { IconSettings } from '@tabler/icons';

export interface MenuNode {
  label: string;
  to?: string;
  icon?: React.ReactNode;
  color?: string;
  children?: MenuNode[];
  onClick?: () => Promise<void> | void;
}

export const useMenu = () => {
  return useMemo<MenuNode[]>(
    () => [
      {
        label: 'Setting',
        icon: <IconSettings size={16} />,
        color: 'violet',
        children: [
          {
            label: 'Access',
            to: 'settings/access',
          },
          {
            label: 'Access',
            to: 'settings/fuck',
          },
        ],
      },
    ],
    [],
  );
};
