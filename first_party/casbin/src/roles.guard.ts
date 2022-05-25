import { CASBIN_ROLES } from './casbin.constants';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CasbinService } from './casbin.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export abstract class RolesGuard implements CanActivate {
  constructor(
    private readonly casbinService: CasbinService,
    private readonly reflector: Reflector,
  ) {}

  abstract getPayload(context: ExecutionContext): Promise<string>;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(
      CASBIN_ROLES,
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let username = request.user?.username as string;

    username = username ?? (await this.getPayload(context));

    console.log(username);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return true;
  }
}
