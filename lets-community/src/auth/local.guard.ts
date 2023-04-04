import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@letscollab/nest-passport-fastify';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
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