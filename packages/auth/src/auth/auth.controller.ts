import {
  Controller,
  UseGuards,
  Get,
  Req,
  Res,
  Session,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SessionRpcAuthConsumerGuard } from './session-rpc-auth-consumer.guard';

import { throwRpcException2Http } from '@letscollab/helper';
import { GithubGuard } from './github.guard';

@Controller('v1/auth')
@ApiTags('v1/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Give up letscollab's register
   */
  // @Post('signin')
  // @ApiCreatedResponse({
  //   type: UserResDto,
  // })
  // @ApiProtectHeader()
  // @UseGuards(ProtectGuard, LocalAuthGuard)
  // async signIn(
  //   @Body() _: LocalSignInDto,
  //   @Session() session: FastifyRequest['session'],
  //   @Req() req: FastifyRequest,
  // ) {
  //   const user = req.user;

  //   session.user = {
  //     loggedIn: true,
  //     username: user.username,
  //     id: user.id,
  //   };

  //   return {
  //     code: ResultCode.SUCCESS,
  //     message: 'Successfully login',
  //     d: user,
  //   };
  // }

  @Get('oauth/github')
  @ApiBearerAuth('jwt')
  @UseGuards(GithubGuard)
  async github() {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  async githubCallback(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Session() session: Record<string, any>,
  ) {
    const r = await this.authService.signupGithub(req.user);

    throwRpcException2Http(r);

    if (r.code > 0) {
      session.user = {
        loggedIn: true,
        id: r.d.id,
        username: r.d.username,
      };
    }

    res.send(r);
  }

  @UseGuards(SessionRpcAuthConsumerGuard)
  @MessagePattern({ cmd: 'auth' })
  async auth(@Payload() payload) {
    return payload;
  }

  @MessagePattern({ cmd: 'set_role_policy' })
  async addRole(@Payload() payload: any) {
    this.authService.setRolePolicy(payload);
    return payload;
  }
}
