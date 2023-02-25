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
export class OtpGuard implements CanActivate {
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
    return true;
  }
}
