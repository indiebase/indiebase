import { useMemo } from 'react';
import { IconSettings, IconFileCode } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import { SidebarTileNode, userProfileAtom } from '@letscollab/console-utils';
import { useAtom } from 'jotai';

export const useMenu = () => {
  let { org, project, user } = useParams();
  const [profile] = useAtom(userProfileAtom);

  return useMemo<SidebarTileNode[]>(() => {
    //TODO:

    let prefix;

    if (org) {
      prefix = 'orgs/' + org;
    } else if (user) {
      prefix = 'users/' + user;
    } else {
      prefix = 'users/' + profile.username;
    }

    let settingList = [
      {
        label: 'Profile',
        to: `${prefix}/settings/profile`,
      },
    ];

    const slug = [prefix, project].filter(Boolean).join('/');

    if (user) {
    }

    if (user && project) {
      return [
        {
          label: 'Project',
          icon: <IconFileCode size={16} />,
          color: 'blue',
          to: prefix,
        },
        {
          label: 'Setting',
          icon: <IconSettings size={16} />,
          color: 'violet',
          type: 'node',
          children: [
            {
              label: 'General',
              to: `${slug}/settings/general`,
            },
            {
              label: 'Access',
              to: `${slug}/settings/access`,
            },
          ],
        },
      ];
    }

    if (org) {
      return [
        {
          label: 'Project',
          icon: <IconFileCode size={16} />,
          color: 'blue',
          to: prefix,
        },
        {
          label: 'Setting',
          icon: <IconSettings size={16} />,
          color: 'violet',
          type: 'node',
          children: [
            {
              label: 'General',
              to: `${slug}/settings/general`,
            },
            {
              label: 'Access',
              to: `${slug}/settings/access`,
            },
          ],
        },
      ];
    }

    return [
      {
        label: 'Project',
        icon: <IconFileCode size={16} />,
        color: 'blue',
        to: prefix,
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
