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
      prefix = ['orgs', org, project].filter(Boolean).join('/');
    } else if (user) {
      prefix = ['users', user, project].filter(Boolean).join('/');
    } else {
      prefix = ['users', profile.username, project].filter(Boolean).join('/');
    }

    console.log(prefix);

    if (project) {
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
              to: `${prefix}/settings/general`,
            },
            {
              label: 'Access',
              to: `${prefix}/settings/access`,
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
              to: `${prefix}/settings/general`,
            },
            {
              label: 'Access',
              to: `${prefix}/settings/access`,
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
        children: [
          {
            label: 'Profile',
            to: `${prefix}/settings/profile`,
          },
        ],
      },
    ];
  }, [org, project, user]);
};
