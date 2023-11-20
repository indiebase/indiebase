export enum RoleStatus {
  inactive = 'inactive',
  active = 'active',
}

export interface PrimitiveRole {
  id: number;
  name: string;
  resource: string;
  action: string;
  attributes?: string;
  description?: string;
  createAt: Date;
  updateAt: Date;
}
