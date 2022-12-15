import { NacosConfigService } from '@letscollab-nest/nacos';
import { AuthService } from './auth.service';
import { GithubGuard } from './github.guard';
import { FastifyReply, FastifyRequest } from 'fastify';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  Controller,
  UseGuards,
  Get,
  Req,
  Res,
  Session,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RpcSessionAuthConsumerGuard } from './rpc-session-auth-consumer.guard';
import {
  ApiProtectHeader,
  getSubdomain,
  ProtectGuard,
  ResultCode,
} from '@letscollab/helper';
import { LocalSignInDto } from './auth.dto';
import { LocalAuthGuard } from './local.guard';
import { HttpAdapterHost } from '@nestjs/core';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly nacos: NacosConfigService,
    private adapterHost: HttpAdapterHost,
  ) {}
  //TODO: recaptcha

  /**
   * Give up letscollab's register
   */
  @Post('signin')
  @ApiProtectHeader()
  @UseGuards(ProtectGuard, LocalAuthGuard)
  async signIn(
    @Body() _: LocalSignInDto,
    @Req() req: FastifyRequest,
    @Session() session: any,
  ) {
    const user = req.user;

    session.set('user', {
      loggedIn: true,
      id: user.id,
      username: user.username,
      accessToken: user.githubAccessToken,
    });

    session.cookie.expires = new Date(
      Date.now() + 60 * 60 * 1000 * 24 * 30 * 99,
    );
    session.cookie.domain = getSubdomain(
      new URL(`${req.protocol}://${req.hostname}`).hostname,
      2,
    );

    return {
      code: ResultCode.SUCCESS,
      message: 'Login Successfully',
    };
  }

  @Get('oauth/github')
  @UseGuards(GithubGuard)
  async github() {}

  @Get('github/callback')
  @UseGuards(GithubGuard)
  async githubCallback(
    @Req() req: FastifyRequest,
    @Session() session: any,
    @Res() res: FastifyReply,
  ) {
    const r = await this.auth.signInGithub(req.user);

    if (r.code > 0) {
      session.set('user', {
        loggedIn: true,
        id: r.d.id,
        username: r.d.username,
        githubAccessToken: req.user.accessToken,
      });

      session.cookie.expires = new Date(
        Date.now() + 60 * 60 * 1000 * 24 * 30 * 99,
      );
      session.cookie.domain = getSubdomain(
        new URL(`${req.protocol}://${req.hostname}`).hostname,
        2,
      );
    }

    return res
      .type('text/html')
      .send(
        '<html><body><h3 style="text-align:center">Success</h3><script>setTimeout(()=>{window.close()}, 1000)</script></body>',
      );
  }

  @Post('logout')
  async logout(@Req() req: FastifyRequest) {
    await req.logOut().catch(() => {
      throw new InternalServerErrorException();
    });
    return { code: ResultCode.SUCCESS };
  }

  @Get('demo')
  async demo() {
    const a = await this.nacos.getConfig('common.json');

    return a.demo;
  }

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
