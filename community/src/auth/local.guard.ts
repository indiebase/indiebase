import { IAuthModuleOptions } from '@indiebase/nest-fastify-passport';
import { AuthGuard } from '@indiebase/nest-fastify-passport';
import {
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  override useAuthenticateOptions(): IAuthModuleOptions<any> {
    return {
      session: false,
    };
  }

  override handleRequest(err: any, user: any, _info: any, _context: any) {
    if (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new UnauthorizedException();
      }
    }

    return user;
  }
}
