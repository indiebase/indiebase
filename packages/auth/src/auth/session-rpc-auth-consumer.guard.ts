import { CasbinService } from '@letscollab/nest-acl';
import { ExtraMountedSession } from '../utils/session.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class SessionRpcAuthConsumerGuard implements CanActivate {
  constructor(private readonly casbinService: CasbinService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let sess = context
      .switchToRpc()
      .getData<FastifyRequest['session'] & ExtraMountedSession>();

    console.log(sess);

    for (const a of sess.access) {
      let { action, resource } = a;

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
