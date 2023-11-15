import { I18nContext } from 'nestjs-i18n';

export enum ResourceGroup {
  user = 'user',
  role = 'role',
  org = 'org',
  /** Project */
  prj = 'prj',
}

export interface Resource {
  name: ResourceGroup | string;
  displayName?: string;
  description?: string;
  group?: boolean;
  children?: Resource[];
}

// Role
export enum RoleResource {
  list = 'role_list',
}

// User
export enum UserResource {
  list = 'user_list',
  role = 'role_list',
}

export type BuiltinResources = RoleResource | UserResource;

export const getResources: (i18n: I18nContext) => Resource[] = (i18n) => [
  {
    name: ResourceGroup.user,
    displayName: i18n.t('res.User'),
    description: i18n.t('res.User'),
    group: true,
    children: [
      {
        name: UserResource.list,
        displayName: i18n.t('res.user_list'),
        description: i18n.t('res.user_list'),
      },
    ],
  },
  {
    name: ResourceGroup.role,
    displayName: i18n.t('res.Role'),
    description: i18n.t('res.Role'),
    group: true,
    children: [
      {
        name: RoleResource.list,
        displayName: i18n.t('res.role_list'),
        description: i18n.t('res.role_list'),
      },
    ],
  },
];
