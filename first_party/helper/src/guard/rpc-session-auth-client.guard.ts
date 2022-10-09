import { FastifyRequest } from 'fastify';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RpcAuthClientGuard } from '@letscollab/nest-acl';
import { AUTH_RMQ } from '../constants';

export class RpcSessionAuthClientGuard extends RpcAuthClientGuard(AUTH_RMQ) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setPattern(_: ExecutionContext): Promise<Record<string, any>> {
    return { cmd: 'auth' };
  }

  override async transfer(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    console.log(req);
    // If not logged in,  RpcAuthClientGuard will throw UnAuthorizedException.
    if (!req.session?.user?.loggedIn) {
      throw new UnauthorizedException({ message: 'Please login' });
    }

    return {
      ...req.session,
      domain: req.headers?.['Package-Name'] ?? req.hostname,
    };
  }
}
