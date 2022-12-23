import { FastifyRequest } from 'fastify';
import {
  ACCESS_META,
  CasbinService,
  IAccessOptions,
} from '@letscollab-nest/accesscontrol';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly casbin: CasbinService,
    private readonly reflector: Reflector,
  ) {}

  getAccess(context: ExecutionContext) {
    return this.reflector.get<IAccessOptions[]>(
      ACCESS_META,
      context.getHandler(),
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const access = this.getAccess(context);
    // No @UseAccess() will pass directly.
    if (!access) return true;

    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const { user } = req.session;

    if (!user?.loggedIn) {
      throw new UnauthorizedException({ message: 'Please login' });
    }

    const domain =
      (req.body as any)?.packageName ??
      req.headers?.['package-name'] ??
      req.hostname;

    for (const item of access) {
      const { action, resource, possess } = item;
      if (resource.indexOf('_') < 0) {
        throw new Error(
          `Resource ${resource} needs prefix to divide groups e.g. groupName_xxxxx`,
        );
      }

      if (action.toLowerCase().indexOf('own') > 0) {
        if (possess) {
          const isOwn = await possess(context);
          if (!isOwn) {
            return false;
          }
        } else {
          throw Error(`${resource} ${action} needs property possess`);
        }
      }

      const hasPermission = await this.casbin.e.enforce(
        user.username,
        domain,
        resource,
        action,
      );

      if (!hasPermission) {
        return false;
      }
    }

    return true;
  }
}
