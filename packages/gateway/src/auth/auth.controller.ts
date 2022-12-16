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
  getSubdomain,
  ProtectGuard,
  ResultCode,
  USER_RMQ,
} from '@letscollab/helper';
import { LocalSignInDto } from './auth.dto';
import { HttpAdapterHost } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';

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
  @Post('signin')
  @ApiProtectHeader()
  @UseGuards(ProtectGuard)
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
  async github() {}

  @Get('github/callback')
  async githubCallback(
    @Req() req: FastifyRequest,
    @Session() session: any,
    @Res() res: FastifyReply,
  ) {}

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
