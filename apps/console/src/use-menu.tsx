import { useMemo } from 'react';
import { IconSettings, IconFileCode } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import { MenuNode } from '@letscollab/app-utils';

export const useMenu = () => {
  const { org, project, user } = useParams();

  console.log(user);

  return useMemo<MenuNode[]>(() => {
    //TODO: Stupid way

    let settingList = [
      {
        label: 'Profile',
        to: `users/${user}/profile`,
      },
    ];

    if (org) {
      const slug = ['orgs', org, project].filter(Boolean).join('/');
      settingList = [
        {
          label: 'General',
          to: `${slug}/settings/general`,
        },
        {
          label: 'Access',
          to: `${slug}/settings/access`,
        },
      ];
    }

    return [
      {
        label: 'Project',
        icon: <IconFileCode size={16} />,
        color: 'blue',
        // replace: true,
        to: org,
      },
      {
        label: 'Setting',
        icon: <IconSettings size={16} />,
        color: 'violet',
        type: 'node',
        children: settingList,
      },
    ];
  }, [org, project, user]);
};
