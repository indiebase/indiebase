import { UserProfile } from '../user';

export interface OrgSelect {
  logo: string;
  label: string;
  value: string;
}

export enum OrgStatus {
  active = 'active',
  inactive = 'inactive',
}

export interface Org {
  id: number;

  name: string;

  githubOrgName: string;

  domain: string;

  contactEmail: string;

  status: OrgStatus;

  description?: string;

  homepage?: string;

  createTime: Date;

  updateTime: Date;

  creatorId: number;

  ownerId: number;

  members?: UserProfile[];
}
