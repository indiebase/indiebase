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
import { Reflector } from '@nestjs/core';
import { ACCESS_META } from './casbin.constants';

abstract class BaseAuthGuard {
  abstract transfer(context: ExecutionContext): Promise<Record<string, any>>;
  abstract setPattern(context: ExecutionContext): Promise<Record<string, any>>;
}

type AbstractAuth = abstract new (...args: any) => BaseAuthGuard;

export function RpcAuthGuard(
  clientName: string,
  options?: {
    timeout?: number;
  },
): AbstractAuth {
  @Injectable()
  abstract class InnerClz extends BaseAuthGuard implements CanActivate {
    constructor(
      private readonly reflector: Reflector,
      @Inject(clientName)
      private readonly client: ClientProxy,
      private readonly logger: Logger,
    ) {
      super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const access = this.reflector.get<[]>(ACCESS_META, context.getHandler());

      if (!access) {
        return true;
      }

      let input = await this.transfer(context);

      input = { ...input, access };

      const pattern = await this.setPattern(context);

      return lastValueFrom<boolean>(
        this.client.send(pattern, input).pipe(
          timeout(options?.timeout ?? 3000),
          catchError((e) => {
            this.logger.error(e);
            throw new UnauthorizedException();
          }),
        ),
      );
    }
  }

  return InnerClz as any;
}
