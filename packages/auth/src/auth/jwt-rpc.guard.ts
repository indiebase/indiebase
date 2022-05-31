import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IVerify, ResultCode } from '@letscollab/helper';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RpcAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let data = context.switchToRpc().getData<IVerify>();
    const arg = context.getArgByIndex(0);

    const payload = this.jwtService.decode(data.token);

    if (!payload) {
      throw new RpcException({ code: ResultCode.ERROR });
    }

    arg['body'] = payload;

    return true;
  }
}
