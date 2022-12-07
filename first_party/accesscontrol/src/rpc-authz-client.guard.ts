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
import { IAccessOptions } from './access.decorator';

abstract class BasicAuthGuard {
  abstract transfer(context: ExecutionContext): Promise<Record<string, any>>;
  abstract setPattern(context: ExecutionContext): Promise<any>;
}

type AbstractAuth = abstract new (...args: any) => BasicAuthGuard;

export function RpcAuthzClientGuard(
  clientName: string,
  options?: {
    timeout?: number;
  },
): AbstractAuth {
  @Injectable()
  abstract class InnerClz extends BasicAuthGuard implements CanActivate {
    constructor(
      @Inject(clientName)
      private readonly client: ClientProxy,
      private readonly reflector: Reflector,
      private readonly logger: Logger,
    ) {
      super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const access = this.reflector.get<IAccessOptions[]>(
        ACCESS_META,
        context.getHandler(),
      );

      const pattern = await this.setPattern(context);
      let input = await this.transfer(context);
      input = { access, ...input };

      // No @UseAccess() will pass directly.
      if (!access) return true;

      for (const a of access) {
        if (a.resource.indexOf('_') < 0) {
          throw new Error(
            `Resource ${a.resource} needs prefix to divide groups e.g. groupName_xxxxx`,
          );
        }

        if (a.action.toLowerCase().indexOf('own') > 0) {
          if (a.possess) {
            const isOwn = await a.possess(context);
            if (!isOwn) {
              return false;
            }
          } else {
            throw Error(`${a.resource} ${a.action} needs property possess`);
          }
        }
      }

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
