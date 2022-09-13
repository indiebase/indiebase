import { CasbinService } from '@letscollab/nest-acl';
import { ExtraMountedSession } from '../utils/session.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SessionRpcAuthConsumerGuard implements CanActivate {
  constructor(private readonly casbinService: CasbinService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const sess = context
      .switchToRpc()
      .getData<Record<string, any> & ExtraMountedSession>();

    console.log(sess, sess.access);

    for (const obj of sess.access) {
      const { action, resource } = obj;
      const hasPermission = await this.casbinService.e.enforce(
        sess.user.username,
        sess.domain,
        resource,
        action,
      );

      if (!hasPermission) {
        return false;
      }
    }

    return true;
  }
}
