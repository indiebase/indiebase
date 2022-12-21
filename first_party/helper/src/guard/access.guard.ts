import { CasbinService } from '@letscollab-nest/accesscontrol';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Scope,
} from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class AccessGuard implements CanActivate {
  constructor(private readonly casbin: CasbinService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.switchToHttp().getRequest();

    for (const obj of data.access) {
      const { action, resource } = obj;
      const hasPermission = await this.casbin.e.enforce(
        data.user.username,
        data.domain,
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
