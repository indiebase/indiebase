import { Observable } from 'rxjs';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JAccountAuth, requestJAccount } from '@/common';
import { stringify } from 'querystring';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err, user, _info, _context) {
    if (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }

    if (!user) {
      throw new UnauthorizedException({ message: '用户登录失败, 请重新登陆' });
    }

    return user;
  }
}
