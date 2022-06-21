import { ExecutionContext } from '@nestjs/common';
import { AUTH_RMQ } from './../app.constants';
import { Http2RpcAuthGuard } from '@letscollab/helper';
import { ExtractJwt } from 'passport-jwt';

export class Http2RmqAuthGuard extends Http2RpcAuthGuard(AUTH_RMQ) {
  async handlePattern(context: ExecutionContext): Promise<Record<string, any>> {
    return { cmd: 'verify' };
  }

  override async handleInput(
    context: ExecutionContext,
  ): Promise<Record<string, any>> {
    const req = context.switchToHttp().getRequest();
    
    return {};
  }
}
