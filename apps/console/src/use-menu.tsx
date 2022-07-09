import { useMemo } from 'react';
import { IconSettings, IconFileCode } from '@tabler/icons';
import { MantineThemeColors } from '@mantine/core';

export interface MenuNode {
  label: string;
  to?: string;
  icon?: React.ReactNode;
  color?: keyof MantineThemeColors;
  children?: MenuNode[];
  onClick?: () => Promise<void> | void;
}

export const useMenu = () => {
  return useMemo<MenuNode[]>(
    () => [
      {
        label: 'Project',
        icon: <IconFileCode size={16} />,
        color: 'blue',
        to: 'projects',
      },
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
