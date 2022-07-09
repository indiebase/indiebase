import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AUTH_RMQ } from '../app.constants';
import { RpcAuthClientGuard } from '@letscollab/nest-acl';
import { FastifyRequest } from 'fastify';

export class SessionRpcAuthClientGuard extends RpcAuthClientGuard(AUTH_RMQ, {
  timeout: 1000,
}) {
  async setPattern(context: ExecutionContext): Promise<Record<string, any>> {
    return { cmd: 'auth' };
  }

  override async transfer(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    // If not logged in,  RpcAuthClientGuard will throw UnAuthorizedException.
    if (!req.session?.user?.loggedIn) {
      throw new UnauthorizedException({ message: '未登录' });
    }

    // req.session.domain =

    return { ...req.session, domain: req.hostname };
  }
}
