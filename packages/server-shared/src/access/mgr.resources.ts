import { I18nContext } from 'nestjs-i18n';

import { Resource } from './resource.interface';

export enum ManagerResourceGroups {
  hackers = 'hackers',
  orgs = 'orgs',
  projects = 'projects',
}

export enum ManagerResources {
  hackers = 'hackers',
  orgs = 'orgs',
}

export const getManagerResources: (i18n: I18nContext) => Resource[] = (
  i18n,
) => [
  {
    name: ManagerResourceGroups.hackers,
    displayName: 'Hackers',
    description: 'Indiebase users, project members',
    group: true,
    children: [
      {
        name: ManagerResources.hackers,
        displayName: 'User list',
        description: 'User list',
      },
    ],
  },
];
