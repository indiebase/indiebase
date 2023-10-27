import { UnionResource } from './resource.interface';

export type Possession = { resource: UnionResource };

export interface CreateRoleBody {
  name: string;
  possession: Possession[];
  domain: string;
}

export enum RoleStatus {
  inactive = 'inactive',
  active = 'active',
}

export interface Role {
  id: number;
  name: string;
  description?: string;
  domain: string;
  status: RoleStatus;
  createTime: Date;
  updateTime: Date;
  possession?: Record<string, string[]>;
}

export interface RoleColumns extends Role {
  actions?: any;
}
