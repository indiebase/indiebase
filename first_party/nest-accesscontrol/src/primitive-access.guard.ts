import { type Permission } from '@indiebase/accesscontrol';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ACCESS_META } from './access.constants';
import { AccessService } from './access.service';
import { IAccessOptions } from './decorators';
import { action2CamelCase } from './utils';

@Injectable()
export abstract class PrimitiveAccessGuard implements CanActivate {
  protected abstract useRole(context: ExecutionContext): Promise<string>;
  protected abstract useNamespace(context: ExecutionContext): Promise<string>;

  constructor(
    private readonly reflector: Reflector,
    private readonly accessService: AccessService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const meta = this.reflector.get<IAccessOptions>(
      ACCESS_META,
      context.getHandler(),
    );

    console.log(!meta, Object.keys(meta).length < 1);

    if (!meta || Object.keys(meta).length < 1) return true;

    const role = await this.useRole?.(context);
    const namespace = await this.useNamespace?.(context);
    const query = this.accessService.getNamespace(namespace)?.can(role);

    if (!query) return false;

    for (const resource in meta) {
      if (Object.prototype.hasOwnProperty.call(meta, resource)) {
        let actions = meta[resource];

        if (!Array.isArray(actions)) {
          actions = [actions as string];
        }

        for (const a of actions) {
          const action = action2CamelCase(a);
          const result: Permission = query[action]?.(resource);

          if (!result.granted) {
            return false;
          }
        }
      }
    }

    return true;
  }
}
