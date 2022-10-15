import { IAccessOptions } from '@letscollab/nest-acl';

export type RequestUser = {
  accessToken: string;
  refreshToken: string;
  profile: Record<string, any>;
};

export type UserSession = {
  username: string;
  id: number;
  role?: string;
  access?: any;
  loggedIn: boolean;
  [k: string]: any;
};

export type ExtraMountedSession = {
  user: UserSession;
  domain: string;
  access: IAccessOptions[];
};
