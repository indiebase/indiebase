import { UserSession } from '../utils/session.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RpcAuthFrontierGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let sess = context
      .switchToRpc()
      .getData<FastifyRequest['session'] & { user: UserSession }>();

    if (!sess.user || !sess.user.loggedIn) {
      return false;
    }

    return true;
  }
}
