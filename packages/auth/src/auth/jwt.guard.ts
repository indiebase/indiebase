import { Observable } from 'rxjs';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  override handleRequest(err, user, _info, _context) {
    if (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }

    return user;
  }
}
