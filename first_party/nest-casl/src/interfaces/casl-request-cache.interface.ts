import { AnyObject } from '../interfaces/common';

import {
  SubjectBeforeFilterHook,
  UserBeforeFilterHook,
} from './hooks.interface';
import { AuthorizableUser } from './authorizable-user.interface';
import { ConditionsProxy } from '../proxies/conditions.proxy';

export interface CaslRequestCache<
  User extends AuthorizableUser<unknown, unknown> = AuthorizableUser,
  Subject = AnyObject,
> {
  user?: User;
  subject?: Subject;
  conditions?: ConditionsProxy;
  hooks: {
    user: UserBeforeFilterHook<User>;
    subject: SubjectBeforeFilterHook<Subject>;
  };
}
