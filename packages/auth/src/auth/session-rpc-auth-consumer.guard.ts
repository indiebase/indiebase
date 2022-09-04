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

    for (const a of sess.access) {
      const { action, resource } = a;

      const hasPermission = await this.casbinService.e.enforce(
        sess.user.username,
        sess.domain,
        resource,
        action,
      );

      console.log(hasPermission);

      if (!hasPermission) {
        return false;
      }
    }

    return true;
  }
}
