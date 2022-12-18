import { NacosConfigService } from '@letscollab-nest/nacos';
import { FastifyReply, FastifyRequest } from 'fastify';
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
  Inject,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiProtectHeader,
  awaitValue,
  getSubdomain,
  ProtectGuard,
  ResultCode,
  RpcException2Http,
  RpcResSchemaDto,
  USER_RMQ,
} from '@letscollab-nest/helper';
import { LocalSignInDto } from './auth.dto';
import { HttpAdapterHost } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { GithubGuard } from './github.guard';
import { LocalAuthGuard } from './local.guard';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(USER_RMQ)
    private readonly userClient: ClientProxy,
    private readonly nacos: NacosConfigService,
    private adapterHost: HttpAdapterHost,
  ) {}
  //TODO: recaptcha

  /**
   * Give up letscollab's register
   */
  @Post('sign-in')
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
    const r = await awaitValue<RpcResSchemaDto>(
      this.userClient,
      { cmd: 'signIn_github' },
      req.user,
      (err) => {
        throw RpcException2Http(err);
      },
    );

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
}
