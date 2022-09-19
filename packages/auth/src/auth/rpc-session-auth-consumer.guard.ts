import { CasbinService } from '@letscollab/nest-acl';
import { ExtraMountedSession } from '../utils/session.interface';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RpcSessionAuthConsumerGuard implements CanActivate {
  constructor(private readonly casbin: CasbinService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const sess = context
      .switchToRpc()
      .getData<Record<string, any> & ExtraMountedSession>();

    console.log(sess, sess.access);
    console.log(
      await this.casbin.e?.getPolicy(),
      await this.casbin.e?.getAllRoles(),
    );

    for (const obj of sess.access) {
      const { action, resource } = obj;
      const hasPermission = await this.casbin.e.enforce(
        sess.user.username,
        sess.domain,
        resource,
        action,
      );

      console.log(hasPermission, '==================');

      if (!hasPermission) {
        return false;
      }
    }

    return true;
  }
}
