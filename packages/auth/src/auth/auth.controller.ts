import { NacosConfigService } from '@letscollab/nest-nacos';
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
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { RpcSessionAuthConsumerGuard } from './rpc-session-auth-consumer.guard';
import { getSubdomain } from '@letscollab/helper';

@Controller('v1/auth')
@ApiTags('v1/Auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly nacos: NacosConfigService,
  ) {}

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
    @Session() session,
    @Res() res: FastifyReply,
  ) {
    const r = await this.auth.signInGithub(req.user);

    r.code > 0 &&
      session.set('user', {
        loggedIn: true,
        id: r.d.id,
        username: r.d.username,
        signupType: r.d.signupType,
        accessToken: req.user.accessToken,
      });

    session.cookie.domain = getSubdomain(
      new URL(`${req.protocol}://${req.hostname}`).hostname,
      2,
    );

    return res
      .type('text/html')
      .send(
        '<html><body><h3 style="text-align:center">Success</h3><script>setTimeout(()=>{window.close()}, 1000)</script></body>',
      );
  }

  @Post('logout')
  @UseGuards(GithubGuard)
  async logout(@Req() req: FastifyRequest, @Session() session) {
    const r = await this.auth.signInGithub(req.user);

    r.code > 0 &&
      session.set('user', {
        loggedIn: true,
        id: r.d.id,
        username: r.d.username,
        signupType: r.d.signupType,
        accessToken: req.user.accessToken,
      });

    return;
  }

  @Get('demo')
  async demo() {
    const a = await this.nacos.getConfig('common.json');
    console.log(a.demo);

    // console.log(
    //   await this.casbin.e?.getPolicy(),
    //   await this.casbin.e?.getAllRoles(),
    // );
    return a.demo;
  }

  @UseGuards(RpcSessionAuthConsumerGuard)
  @MessagePattern({ cmd: 'auth' })
  async rpcAuth(@Payload() payload) {
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
