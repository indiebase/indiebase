import { type Permission } from '@indiebase/accesscontrol';
import type {
  CanActivate,
  ExecutionContext} from '@nestjs/common';
import {
  Injectable,
  Logger,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';

import { ACCESS_META } from './access.constants';
import type { AccessService } from './access.service';
import type { IAccessOptions } from './decorators';
import { action2CamelCase } from './utils';

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

    if (!meta) return true;

    const role = await this.useRole?.(context);
    const namespace = await this.useNamespace?.(context);
    const query = this.ac.getNamespace(namespace).can(role);

    for (const resource in meta) {
      console.log(resource);
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
