import { FastifyRequest } from 'fastify';
import { ExecutionContext } from '@nestjs/common';
import { AUTH_RMQ } from '../app.constants';
import { RpcAuthGuard } from '@letscollab/nest-acl';

export class SessionRpcAuthGuard extends RpcAuthGuard(AUTH_RMQ) {
  async setPattern(context: ExecutionContext): Promise<Record<string, any>> {
    return { cmd: 'authenticate' };
  }

  override async transfer(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    return req.session;
  }
}
