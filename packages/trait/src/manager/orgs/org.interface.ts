import { Visibility } from '../common';

export interface PrimitiveOrg {
  id: number;
  name: string;
  githubOrg: string;
  avatarUrl?: string;
  domain: string;
  contactEmail: string;
  visibility: Visibility;
  description?: string;
  homepage?: string;
  createTime: Date;
  updateTime: Date;
  creatorId: number;
  ownerId: number;
}
