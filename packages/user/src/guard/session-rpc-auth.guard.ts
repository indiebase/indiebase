import { FastifyRequest } from 'fastify';
import { ExecutionContext } from '@nestjs/common';
import { AUTH_RMQ } from '../app.constants';
import { RpcAuthClientGuard } from '@letscollab/nest-acl';

export class SessionRpcAuthGuard extends RpcAuthClientGuard(AUTH_RMQ) {
  async setPattern(context: ExecutionContext): Promise<Record<string, any>> {
    return { cmd: 'authenticate' };
  }

  override async transfer(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();

    return { ...req.session, domain: req.hostname };
  }
}
