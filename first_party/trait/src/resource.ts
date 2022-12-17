export enum ResourceGroup {
  USER = 'user',
  ROLE = 'role',
  TEAM = 'team',
  ORG = 'org',
  /** Project */
  Prj = 'prj',
}

export interface Resource {
  name: ResourceGroup | string;
  displayName?: string;
  description?: string;
  isGroup?: boolean;
  children?: Resource[];
}

// Role
export enum RoleResource {
  list = 'role_list',
}

// User
export enum UserResource {
  list = 'user_list',
}

export type UnionResource = RoleResource | UserResource;