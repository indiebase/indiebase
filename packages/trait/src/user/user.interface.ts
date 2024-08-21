import { AuthnTypes } from '@indiebase/sdk';

import { Visibility } from '../manager';
import { Primordials } from '../primordials.interface';

export enum AccountStatus {
  inactive = 'inactive',
  active = 'active',
}

export interface PrimitiveUser extends Primordials {
  id: number;
  email: string;
  role?: string;
  nickname?: string;
  avatarUrl?: string;
  language?: string;
  location?: string;
  authnType: AuthnTypes;
  accountStatus: AccountStatus;
  enabled2FA: boolean;
  signInAt: Date;
  emailConfirmedAt: Date;
  [key: string]: any;
}

export interface InternalUser extends PrimitiveUser {
  password: string;
  passwordUpdatedAt: Date;
  deletedAt: Date;
  otpRecoveryCodes: string[];
  otpSecret: string;
}

export interface Hacker extends PrimitiveUser {
  bio?: string;
  homepage?: string;
  githubUsername?: string;
  visibility?: Visibility;
}
