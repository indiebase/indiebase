import { ExecutionContext } from '@nestjs/common';
import { AUTH_RMQ } from '../app.constants';
import { RpcAuthGuard } from '@letscollab/helper';
import { ExtractJwt } from 'passport-jwt';

export class UserRpcAuthGuard extends RpcAuthGuard(AUTH_RMQ, {
  timeout: 1000,
}) {
  async handlePattern(context: ExecutionContext): Promise<Record<string, any>> {
    return { cmd: 'verify' };
  }

  override async transfer(
    context: ExecutionContext,
  ): Promise<Record<string, any>> {
    const req = context.switchToHttp().getRequest();
    return { token: ExtractJwt.fromAuthHeaderAsBearerToken()(req) };
  }
}
