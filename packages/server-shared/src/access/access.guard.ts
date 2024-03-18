import { PrimitiveAccessGuard } from '@indiebase/nest-ac';
import type { ExecutionContext} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { type FastifyRequest } from 'fastify';

@Injectable()
export class AccessGuard extends PrimitiveAccessGuard {
  protected override async useRole(context: ExecutionContext): Promise<string> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    console.log(request.user);
    return request.user?.role;
  }

  protected override async useNamespace(
    context: ExecutionContext,
  ): Promise<string> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    return request.raw.project?.namespace;
  }
}
