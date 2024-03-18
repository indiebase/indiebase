import { AuthGuard } from '@indiebase/nest-fastify-passport';
import type { Logger} from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class PasetoAuthGuard extends AuthGuard('paseto') {
  constructor(private readonly logger: Logger) {
    super();
  }

  override handleRequest(err: any, user: any, _info: any, _context: any) {
    if (err || !user) {
      if (err) this.logger.error(err);
      throw new UnauthorizedException();
    }

    return user;
  }
}
