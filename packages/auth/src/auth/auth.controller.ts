import { LocalAuthGuard } from './local.guard';
import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Req,
  Res,
  Session,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ProtectGuard,
  ApiProtectHeader,
  IVerify,
  ResultCode,
} from '@letscollab/helper';
import { UserResDto } from '@letscollab/user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SessionRpcAuthConsumerGuard } from './session-rpc-auth-consumer.guard';
import { GithubGuard } from './github.guard';
import { LocalSignInDto } from './auth.dto';

@Controller('v1/auth')
@ApiTags('v1/Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiCreatedResponse({
    type: UserResDto,
  })
  @ApiProtectHeader()
  @UseGuards(ProtectGuard, LocalAuthGuard)
  async signIn(
    @Body() _: LocalSignInDto,
    @Session() session: FastifyRequest['session'],
    @Req() req: FastifyRequest,
  ) {
    const user = req.user;

    session.user = {
      loggedIn: true,
      username: user.username,
      id: user.id,
    };

    return {
      code: ResultCode.SUCCESS,
      message: 'Successfully login',
      d: user,
    };
  }

  @Get('oauth/github')
  @ApiBearerAuth('jwt')
  @UseGuards(GithubGuard)
  async github(@Request() req: FastifyRequest & { user: any }) {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  async githubCallback(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const r = await this.authService.signupGithub(req.user);

    if (r.code > 0) {
      res.setCookie('__HOST-t', r.d.t, { httpOnly: true, secure: true });
    }

    res.send(r);
  }

  @UseGuards(SessionRpcAuthConsumerGuard)
  @MessagePattern({ cmd: 'auth' })
  async auth(@Payload() payload: IVerify) {
    return payload;
  }

  @MessagePattern({ cmd: 'set_role_policy' })
  async addRole(@Payload() payload: string[]) {
    this.authService.setRolePolicy(payload);
    return payload;
  }
}
