import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAccessOptions } from './decorators';
import { ACCESS_META } from './access.constants';
import { AccessService } from './access.service';

@Injectable()
export abstract class PrimitiveAccessGuard implements CanActivate {
  private readonly logger = new Logger('PrimitiveAccessGuard');
  protected abstract useRole(context: ExecutionContext): Promise<string>;
  protected abstract useNamespace(context: ExecutionContext): Promise<string>;

  constructor(
    private readonly reflector: Reflector,
    private readonly ac: AccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const meta = this.reflector.get<IAccessOptions>(
      ACCESS_META,
      context.getHandler(),
    );

    // No @UseAccess() will pass directly.
    if (!meta) return true;

    const { possess, ...access } = meta;

    // this.ac.getNamespace('').can('').readAny('demo');

    const role = await this.useRole?.(context);
    const namespace = await this.useNamespace?.(context);

    // let input = await this.transfer(context);
    // input = { access, ...input };

    for (const resource in access) {
      if (Object.prototype.hasOwnProperty.call(access, resource)) {
        let actions = access[resource];

        if (!Array.isArray(actions)) {
          actions = [actions as string];
        }

        for (const action of actions) {
        }
      }
    }

    // for (const a of access) {
    //   if (a.resource.indexOf('_') < 0) {
    //     throw new Error(
    //       `Resource ${a.resource} needs prefix to divide groups e.g. groupName_xxxxx`,
    //     );
    //   }

    // this.ac.getNamespace('').can('user')[AccessActions]

    // if (a.action.toLowerCase().indexOf('own') > 0) {
    //   if (a.possess) {
    //     const isOwn = await a.possess(context);
    //     if (!isOwn) {
    //       return false;
    //     }
    //   } else {
    //     throw Error(`${a.resource} ${a.action} needs property possess`);
    //   }
    // }
    // }

    return true;
    // return lastValueFrom<boolean>(
    //   this.client.send(pattern, input).pipe(
    //     timeout(options?.timeout ?? 3000),
    //     catchError((e) => {
    //       this.logger.error(e);
    //       throw new UnauthorizedException();
    //     }),
    //   ),
    // );
  }
}
