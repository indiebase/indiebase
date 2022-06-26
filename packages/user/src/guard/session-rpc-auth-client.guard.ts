import { FastifyRequest } from 'fastify';
import { ExecutionContext } from '@nestjs/common';
import { AUTH_RMQ } from '../app.constants';
import { RpcAuthClientGuard } from '@letscollab/nest-acl';

export class SessionRpcAuthClientGuard extends RpcAuthClientGuard(AUTH_RMQ) {
  async setPattern(context: ExecutionContext): Promise<Record<string, any>> {
    return { cmd: 'authenticate' };
  }

  override async transfer(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    // If not logged in,  RpcAuthClientGuard will throw UnAuthorizedException.
    if (!req.session?.user.loggedIn) {
      return false;
    }

    return { ...req.session, domain: req.hostname };
  }
}
