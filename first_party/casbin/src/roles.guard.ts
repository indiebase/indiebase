import { CASBIN_ROLES } from './casbin.constants';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CasbinService } from './casbin.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly casbinService: CasbinService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(
      CASBIN_ROLES,
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return true;
  }
}
