import { useMemo } from 'react';
import { IconSettings, IconFileCode } from '@tabler/icons';
import { MantineThemeColors } from '@mantine/core';
import {
  resolvePath,
  useLocation,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import { MenuNode } from '@letscollab/app-utils';

export const useMenu = () => {
  const { org, project } = useParams();

  const resolve = useResolvedPath('settings/general');

  console.log(resolve);

  return useMemo<MenuNode[]>(() => {
    return [
      {
        label: 'Project',
        icon: <IconFileCode size={16} />,
        color: 'blue',
        replace: true,
        to: org,
      },
      {
        label: 'Setting',
        icon: <IconSettings size={16} />,
        color: 'violet',
        type: 'node',
        children: [
          {
            label: 'General',
            to: 'user/settings',
            // to: 'settings/general',
          },
          {
            label: 'Access',
            to: 'settings/access',
          },
        ],
      },
    ];
  }, [org]);
};
