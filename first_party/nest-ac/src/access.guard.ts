import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAccessOptions } from './decorators';
import { ACCESS_META } from './access.constants';

@Injectable()
export class AccessGuard implements CanActivate {
  private readonly logger = new Logger('AccessGuard');

  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const access = this.reflector.get<IAccessOptions[]>(
      ACCESS_META,
      context.getHandler(),
    );

    // const pattern = await this.setPattern(context);
    // let input = await this.transfer(context);
    // input = { access, ...input };

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
