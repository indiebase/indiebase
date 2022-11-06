import { Observable } from 'rxjs';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@letscollab/passport';

@Injectable()
export class GithubGuard extends AuthGuard('github') {
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> | any {
    return super.canActivate(context);
  }

  override getAuthenticateOptions(): IAuthModuleOptions<any> {
    return {
      scope: ['user', 'repo', 'admin:org'],
    };
  }

  override handleRequest(err, user, _info, _context) {
    if (err || !user) {
      throw new UnauthorizedException({ message: 'Unauthorized', ...err });
    }

    return user;
  }
}
