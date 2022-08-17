import { useMemo } from 'react';
import { IconSettings, IconFileCode } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import { MenuNode, userProfileQuery } from '@letscollab/app-utils';
import { useAtom } from 'jotai';

export const useMenu = () => {
  const { org, project } = useParams();

  const [value] = useAtom(userProfileQuery);

  console.log(value);

  return useMemo<MenuNode[]>(() => {
    //TODO: Stupid way

    let settingList = [
      {
        label: 'General',
        to: 'user/settings/general',
      },
    ];

    const slug = [org, project].filter(Boolean).join('/');

    if (org) {
      settingList = [
        {
          label: 'General',
          to: `${org}/settings/general`,
        },
        {
          label: 'Access',
          to: `${org}/settings/access`,
        },
      ];
    }

    if (org && project) {
      settingList = [
        {
          label: 'General',
          to: `${org}/${project}/settings/general`,
        },
        {
          label: 'Access',
          to: `${org}/${project}/settings/access`,
        },
      ];
    }

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
        children: settingList,
      },
    ];
  }, [org, project, value]);
};
