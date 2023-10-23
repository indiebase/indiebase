import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import {
  AuthGuard,
  IAuthModuleOptions,
} from '@indiebase/nest-fastify-passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private readonly logger: Logger) {
    super();
  }

  override useAuthenticateOptions(): IAuthModuleOptions<any> {
    return {
      session: false,
    };
  }

  override handleRequest(err: any, user: any, _info: any, _context: any) {
    if (err || !user) {
      this.logger.error(err);
      throw new UnauthorizedException();
    }

    return user;
  }
}
