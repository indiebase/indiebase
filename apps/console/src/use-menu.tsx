import { useMemo } from 'react';
import { IconSettings, IconFileCode } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import {
  SidebarTileNode,
  userProfileQueryAtom,
} from '@letscollab-community/console-utils';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

export const useMenu = () => {
  const params = useParams();
  const { org, project, user } = params;
  const [data] = useAtom(userProfileQueryAtom[0]);
  const { t, i18n } = useTranslation(['common', 'setting']);
  const profile = data.d;

  // if not match, menu is immutable.
  const deps = !!params['*'] ? [] : [org, project, user, i18n.language];

  return useMemo<SidebarTileNode[]>(() => {
    //TODO:optimize this stupid way.

    let prefix;

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
          label: t('Setting'),
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
          label: t('Setting'),
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
        label: t('Setting'),
        icon: <IconSettings size={16} />,
        color: 'violet',
        type: 'node',
        children: [
          {
            label: t('Profile', { ns: 'setting' }),
            to: `${prefix}/settings/profile`,
          },
          {
            label: t('Organizations', { ns: 'setting' }),
            to: `${prefix}/settings/organization`,
          },
          {
            label: t('Two-factor auth', { ns: 'setting' }),
            to: `${prefix}/settings/2fa`,
          },
        ],
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
