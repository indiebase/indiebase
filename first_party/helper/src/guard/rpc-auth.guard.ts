import { FastifyRequest } from 'fastify';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { catchError, timeout, lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

abstract class AbsAuthGuard {
  abstract handleInput(context: ExecutionContext): Promise<Record<string, any>>;
  abstract handlePattern(
    context: ExecutionContext,
  ): Promise<Record<string, any>>;
}

type AbstractClz = abstract new (...args: any) => AbsAuthGuard;

export function Http2RpcAuthGuard(
  clientName: string,
  options?: {
    property?: string;
    timeout?: number;
  },
): AbstractClz {
  @Injectable()
  abstract class InnerClz extends AbsAuthGuard implements CanActivate {
    constructor(
      @Inject(clientName)
      private readonly client: ClientProxy,
      private readonly logger: Logger,
    ) {
      super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest<FastifyRequest>();

      let input = await this.handleInput(context);
      let pattern = await this.handlePattern(context);

      let r = await lastValueFrom<boolean | Record<string, any> | undefined>(
        this.client.send(pattern, input).pipe(
          timeout(options?.timeout ?? 3000),
          catchError((e) => {
            this.logger.error(e);
            throw new UnauthorizedException({
              message: '认证失败',
            });
          }),
        ),
      );

      req[options?.property ?? 'user'] = r;

      return r ? true : false;
    }
  }

  return InnerClz as any;
}
