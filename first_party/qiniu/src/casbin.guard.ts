import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { CasbinService } from './casbin.service';

@Injectable()
export class CasbinGuard implements CanActivate {
  constructor(private readonly casbinService: CasbinService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return true;
  }
}
