import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@letscollab-nest/fastify-passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  override handleRequest(err: any, user: any, _info: any, _context: any) {
    if (err || !user) {
      throw new UnauthorizedException({ message: 'Unauthorized', ...err });
    }

    return user;
  }

  override async canActivate(context: ExecutionContext) {
    const can = await super.canActivate(context);
    if (can) {
      const req = context.switchToHttp().getRequest();
      super.logIn(req);
    }

    return true;
  }
}
