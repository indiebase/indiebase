export enum AccountStatus {
  inactive = 'inactive',
  active = 'active',
}

export interface BasicUser {
  id: number;
  email: string;
  nickname?: string;
  avatarUrl?: string;
  bio?: string;
  enabledOtp: boolean;
  createAt: Date;
  updateAt: Date;
}

export interface User extends BasicUser {}
