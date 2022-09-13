import { AccessAction, IAccessOptions } from '@letscollab/nest-acl';

export type UserSession = {
  username: string;
  id: number;
  role: string;
  access: any;
  loggedIn: boolean;
  [k: string]: any;
};

export type ExtraMountedSession = {
  user: UserSession;
  domain: string;
  access: IAccessOptions[];
};

export interface RpcRoleBody {
  name: string;
  possession: { resource: string; action: AccessAction[] }[];
  domain: string;
}
