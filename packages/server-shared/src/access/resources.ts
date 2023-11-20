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
    displayName: 'User',
    description: 'User',
    group: true,
    children: [
      {
        name: UserResource.list,
        displayName: 'User list',
        description: 'User list',
      },
    ],
  },
  {
    name: ResourceGroup.role,
    displayName: 'Role',
    description: 'Role',
    group: true,
    children: [
      {
        name: RoleResource.list,
        displayName: 'Role list',
        description: 'Role list',
      },
    ],
  },
];
