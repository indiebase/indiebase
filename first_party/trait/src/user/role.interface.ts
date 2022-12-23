import { AccessAction } from '@letscollab-nest/accesscontrol';
import { UnionResource } from './resource.interface';

export type Possession = { resource: UnionResource; action: AccessAction[] };

export interface CreateRoleBody {
  name: string;
  possession: Possession[];
  domain: string;
}

export enum RoleStatus {
  inactive = 'inactive',
  active = 'active',
}
