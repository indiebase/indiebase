import { Observable } from 'rxjs';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AuthGuard,
  IAuthModuleOptions,
} from '@letscollab/nest-fastify-passport';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> | any {
    return super.canActivate(context);
  }

  override useAuthenticateOptions(): IAuthModuleOptions<any> {
    return {
      scope: ['email', 'profile'],
    };
  }

  override handleRequest(err: any, user: any, _info: any, _context: any) {
    if (err || !user) {
      throw new UnauthorizedException({ message: 'Unauthorized', ...err });
    }

    return user;
  }
}
