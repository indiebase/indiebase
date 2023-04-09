import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@letscollab/nest-fastify-passport';

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
