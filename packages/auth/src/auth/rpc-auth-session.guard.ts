import { ExtraMountedSession } from '../utils/session.interface';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class RpcAuthSessionGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let sess = context
      .switchToRpc()
      .getData<FastifyRequest['session'] & ExtraMountedSession>();

    console.log(sess);

    if (!sess.user || !sess.user.loggedIn) {
      return false;
    }

    return true;
  }
}
