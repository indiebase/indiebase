import { IAccessOptions } from '@letscollab-nest/accesscontrol';

/**
 * Signup Type Enum
 */
export enum SignupType {
  letscollab = 'letscollab',
  github = 'github',
}

export type UserSession = {
  username: string;
  // database use id
  id: number;
  role?: string;
  access?: any;
  loggedIn: boolean;
  [k: string]: any;
};

export type RpcAuthData = {
  user: UserSession;
  domain: string;
  access: IAccessOptions[];
};
