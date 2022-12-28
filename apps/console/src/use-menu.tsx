import { useMemo } from 'react';
import { IconSettings, IconFileCode } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import { SidebarTileNode, userProfileAtom } from '@letscollab/console-utils';
import { useAtom } from 'jotai';

export const useMenu = () => {
  const params = useParams();
  const { org, project, user } = params;
  const [profile] = useAtom(userProfileAtom);

  // if not match, menu is immutable.
  const deps = !!params['*'] ? [] : [org, project, user];

  return useMemo<SidebarTileNode[]>(() => {
    //TODO:

    let prefix;

    console.log(profile.username);
    if (org) {
      prefix = ['orgs', org, project].filter(Boolean).join('/');
    } else {
      prefix = ['users', user ?? profile.username, project]
        .filter(Boolean)
        .join('/');
    }

    // Project
    if (project) {
      return [
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

    //  Organization
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
              label: 'Member',
              to: `${prefix}/settings/member`,
            },
            {
              label: 'Access',
              to: `${prefix}/settings/access`,
            },
          ],
        },
      ];
    }

    // User
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
  }, deps);
};
