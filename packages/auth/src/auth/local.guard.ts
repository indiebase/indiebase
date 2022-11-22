import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@letscollab/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  override handleRequest(err: any, user: any, _info: any, _context: any) {
    if (err || !user) {
      throw new UnauthorizedException({ message: 'Unauthorized', ...err });
    }

    return user;
  }
}
