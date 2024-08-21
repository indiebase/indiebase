import { Primordials } from '../primordials.interface';

export enum RoleStatus {
  inactive = 'inactive',
  active = 'active',
}

export interface PrimitiveRole extends Primordials {
  id: number;
  name: string;
  resource: string;
  action: string;
  attributes?: string;
  description?: string;
}
