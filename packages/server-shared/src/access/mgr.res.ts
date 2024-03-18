import type { I18nContext } from 'nestjs-i18n';

import type { Resource } from './resources';
export enum ManagerResourceGroups {
  hackers = 'hackers',
  orgs = 'orgs',
  projects = 'projects',
}

export enum ManagerResources {
  hackerList = 'hackerList',
}

export const getManagerResources: (i18n: I18nContext) => Resource[] = (
  i18n,
) => [
  {
    name: ManagerResourceGroups.hackers,
    displayName: 'Hackers',
    description: 'Project members',
    group: true,
    children: [
      {
        name: ManagerResources.hackerList,
        displayName: 'User list',
        description: 'User list',
      },
    ],
  },
];
