import { AuthService } from './auth.service';
import { GithubGuard } from './github.guard';
import { UserResponseDto } from '@letscollab/user';
import { FastifyReply, FastifyRequest } from 'fastify';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, UseGuards, Get, Req, Res, Session } from '@nestjs/common';
import { ApiBearerAuth, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { RpcSessionAuthConsumerGuard } from './rpc-session-auth-consumer.guard';
import { CasbinService } from '@letscollab/nest-acl';

@Controller('v1/auth')
@ApiTags('v1/Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly casbin: CasbinService,
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
  @ApiResponseProperty({
    type: UserResponseDto,
  })
  async githubCallback(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
    @Session() session: Record<string, any>,
  ) {
    const r = await this.authService.signInGithub(req.user);

    if (r.code > 0) {
      session.user = {
        loggedIn: true,
        id: r.d.id,
        username: r.d.username,
      };
    }

    res.send(r);
  }

  @Get('demo')
  async deo() {
    console.log(
      await this.casbin.e?.getPolicy(),
      await this.casbin.e?.getAllRoles(),
    );
    return 1;
  }

  @UseGuards(RpcSessionAuthConsumerGuard)
  @MessagePattern({ cmd: 'auth' })
  async auth(@Payload() payload) {
    return payload;
  }

  @MessagePattern({ cmd: 'set_role_policy' })
  async addRole(@Payload() payload: any) {
    await this.authService.createRolePolicy(payload);
    return true;
  }

  @MessagePattern({ cmd: 'set_user_role' })
  async attachRole(@Payload() payload: any) {
    await this.authService.attachRoleForUser(payload);
    return true;
  }
}
