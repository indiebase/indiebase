import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RpcSessionAuthConsumerGuard } from './rpc-session-auth-consumer.guard';

@Controller({ path: 'auth', version: '1' })
@ApiTags('v1/Auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}
  @UseGuards(RpcSessionAuthConsumerGuard)
  @MessagePattern({ cmd: 'auth' })
  async rpcAuth(@Payload() payload: any) {
    return payload;
  }

  @MessagePattern({ cmd: 'set_role_policy' })
  async addRole(@Payload() payload: any) {
    await this.auth.createRolePolicy(payload);
    return true;
  }

  @MessagePattern({ cmd: 'set_user_role' })
  async attachRole(@Payload() payload: any) {
    await this.auth.attachRoleForUser(payload);
    return true;
  }
}
