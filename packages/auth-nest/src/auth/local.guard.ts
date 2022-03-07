import { Observable } from 'rxjs';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
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

    console.log(user);

    // if (!user) {
    //   throw new UnauthorizedException({ message: '用户登录失败, 请重新登陆' });
    // }

    return user;
  }
}
