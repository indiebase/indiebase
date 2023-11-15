import { ExecutionContext, Injectable } from '@nestjs/common';
import { PrimitiveAccessGuard } from '@indiebase/nest-ac';
import { type FastifyRequest } from 'fastify';

@Injectable()
export class AccessGuard extends PrimitiveAccessGuard {
  protected override async useRole(context: ExecutionContext): Promise<string> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    return request.user?.role;
  }

  protected override async useNamespace(
    context: ExecutionContext,
  ): Promise<string> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    return request.raw.project?.namespace;
  }
}
