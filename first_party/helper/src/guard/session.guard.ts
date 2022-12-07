import { Observable } from 'rxjs';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@letscollab-nest/fastify-passport';
import { FastifyRequest } from 'fastify';

@Injectable()
export class SessionGuard extends AuthGuard('session') {
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> | any {
    return super.canActivate(context);
  }

  override handleRequest(
    err: any,
    user: any,
    _info: any,
    context: ExecutionContext,
  ) {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    console.log();
    console.log(req.session);
    return user;
  }
}
