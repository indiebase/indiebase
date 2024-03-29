export enum AccountStatus {
  inactive = 'inactive',
  active = 'active',
}

export interface PrimitiveUser {
  id: number;
  email: string;
  role: string;
  nickname?: string;
  avatarUrl?: string;
  bio?: string;
  enabledOtp: boolean;
  createAt: Date;
  updateAt: Date;
}

export interface User extends PrimitiveUser {}
