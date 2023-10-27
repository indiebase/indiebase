export enum ResourceGroup {
  USER = 'user',
  ROLE = 'role',
  TEAM = 'team',
  ORG = 'org',
  /** Project */
  Prj = 'prj',
}

export interface Resource {
  name: string;
  label?: string;
  description?: string;
  group: ResourceGroup;
  groupLabel?: string;
  /* Is the default permission */
  default?: boolean;
}

// Role
export enum RoleResource {
  list = 'role_list',
}

// User
export enum UserResource {
  list = 'user_list',
}

// Project
export enum ProjectResource {
  list = 'project_list',
}

export enum OrgResource {
  list = 'org_list',
  memberList = 'org_member_list',
}

export type UnionResource = RoleResource | UserResource | OrgResource;
