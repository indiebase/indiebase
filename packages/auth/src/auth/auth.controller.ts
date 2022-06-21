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
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RolesGuard } from '@letscollab/nest-casbin';
import { ProtectGuard, ApiProtectHeader, IVerify } from '@letscollab/helper';
import { UserResDto } from '@letscollab/user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RpcAuthGuard } from './rpc-auth.guard';
import { GithubGuard } from './github.guard';
import { SessionGuard } from './session.guard';

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
    @Session() session: FastifyRequest['session'],
    @Req() req: FastifyRequest,
  ) {
    const user = req.user;

    session.user = {
      loggedIn: true,
      username: user.username,
      id: user.id,
    };

    return user;
  }

  @Get('profile')
  @ApiProtectHeader()
  @UseGuards(ProtectGuard, SessionGuard)
  async profile(@Request() req: FastifyRequest) {
    console.log(req.user);

    return 'demo';
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

  @UseGuards(RpcAuthGuard, RolesGuard)
  @MessagePattern({ cmd: 'verify' })
  async auth(@Payload() payload: IVerify) {
    return payload;
  }
}
