import { useMemo } from 'react';
import { IconSettings, IconFileCode } from '@tabler/icons';
import { MantineThemeColors } from '@mantine/core';
import { useParams } from 'react-router-dom';

export interface MenuNode {
  label: string;
  to?: string;
  icon?: React.ReactNode;
  color?: keyof MantineThemeColors;
  children?: MenuNode[];
  onClick?: () => Promise<void> | void;
}

export const useMenu = () => {
  const { org } = useParams();

  return useMemo<MenuNode[]>(
    () => [
      {
        label: 'Project',
        icon: <IconFileCode size={16} />,
        color: 'blue',
        to: org,
      },
      {
        label: 'Setting',
        icon: <IconSettings size={16} />,
        color: 'violet',
        children: [
          {
            label: 'Access',
            to: 'access',
          },
          {
            label: 'Access',
            to: 'fuck',
          },
        ],
      },
    ],
    [org],
  );
};
