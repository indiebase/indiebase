import { CombineResource } from '../resources/index';
import { AccessAction } from '@letscollab/nest-ac';
import { IAccessOptions } from '@letscollab/nest-ac';

type Possession = { resource: CombineResource; action: AccessAction[] };

export interface RpcCreateRoleBody {
  name: string;
  possession: Possession[];
  domain: string;
}

export type UserSession = {
  username: string;
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
