import { FastifyRequest } from 'fastify';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RpcAuthzClientGuard } from '@letscollab/nest-ac';
import { AUTH_RMQ } from '../constants';

export class RpcSessionAuthzClientGuard extends RpcAuthzClientGuard(AUTH_RMQ) {
  override async setPattern(_: ExecutionContext): Promise<Record<string, any>> {
    return { cmd: 'auth' };
  }

  override async transfer(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    // If not logged in,  RpcAuthzClientGuard will throw UnAuthorizedException.
    if (!(req.session as any)?.user?.loggedIn) {
      throw new UnauthorizedException({ message: 'Please login' });
    }

    return {
      ...req.session,
      domain:
        (req.body as any)?.packageName ??
        req.headers?.['package-name'] ??
        req.hostname,
    };
  }
}
