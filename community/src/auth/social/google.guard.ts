import type {
  IAuthModuleOptions} from '@indiebase/nest-fastify-passport';
import {
  AuthGuard
} from '@indiebase/nest-fastify-passport';
import type {
  ExecutionContext} from '@nestjs/common';
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Observable } from 'rxjs';

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
