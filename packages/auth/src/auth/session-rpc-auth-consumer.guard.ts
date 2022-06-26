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

    for (const acc of sess.access) {
      const { action, resource } = acc;

      // this.casbinService.e.enforce;
    }

    return true;
  }
}
