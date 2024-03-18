import { AuthGuard } from '@indiebase/nest-fastify-passport';
import type { Logger} from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class MicrosoftGuard extends AuthGuard('local') {
  constructor(private readonly logger: Logger) {
    super();
  }

  override handleRequest(err: any, user: any, _info: any, _context: any) {
    if (err || !user) {
      this.logger.error(err);
      throw new UnauthorizedException();
    }

    return user;
  }
}
