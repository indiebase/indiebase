import { CombineResource } from '../resources/index';
import { AccessAction } from '@letscollab/nest-acl';

type Possession = { resource: CombineResource; action: AccessAction[] };

export interface RpcCreateRoleBody {
  name: string;
  possession: Possession[];
  domain: string;
}
