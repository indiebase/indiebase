import { AccessAction } from '@letscollab-nest/accesscontrol';
import { UnionResource } from './resource';

export type Possession = { resource: UnionResource; action: AccessAction[] };

export interface RpcCreateRoleBody {
  name: string;
  possession: Possession[];
  domain: string;
}

export enum RoleStatus {
  inactive = 'inactive',
  active = 'active',
}
