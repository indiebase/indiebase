import { SessionRpcAuthClientGuard } from '../guard/session-rpc-auth-client.guard';
import {
  Controller,
  Get,
  Patch,
  Req,
  Res,
  Session,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';

import { FastifyReply, FastifyRequest } from 'fastify';
import {
  CsrfGuard,
  MicroserviceExceptionFilter,
  ProtectGuard,
} from '@letscollab/helper';
import { SignupType } from './user.enum';

@Controller('v1/user')
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_complete_name' })
  async getFullUser(@Payload() username: string) {
    return this.userService.getUser([{ username }], true);
  }

  @MessagePattern({ cmd: 'get_name' })
  async getName(@Payload() username: string) {
    return this.userService.getUser([{ username }]);
  }

  @MessagePattern({ cmd: 'get_id' })
  async getId(@Payload() id: number) {
    return this.userService.getUser([{ id }]);
  }

  @UseFilters(MicroserviceExceptionFilter)
  @MessagePattern({ cmd: 'signup_github' })
  async signupGithub(@Payload() profile) {
    const { _json: json, username, profileUrl, id, displayName } = profile;
    return this.userService.signup({
      username: username,
      profileUrl: profileUrl,
      signupType: SignupType.github,
      githubId: id,
      nickname: displayName,
      email: json?.email,
      avatar: json?.avatar_url,
      bio: json?.bio,
    });
  }

  @Get('list')
  @ApiCookieAuth('SID')
  @UseGuards(CsrfGuard, ProtectGuard, SessionRpcAuthClientGuard)
  async getUserList(
    @Session() session,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    res.send({ token: 1 });
  }

  @Get('profile/:username')
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, SessionRpcAuthClientGuard)
  @ApiOperation({
    summary: 'Get a user profile default own',
  })
  async getProfile(@Session() session, @Req() req) {
    return 1;
  }

  @Patch('profile')
  @ApiOperation({
    summary: 'Update a user profile',
  })
  @UseGuards(ProtectGuard)
  // @UseGuards(Http2RmqAuthGuard)
  async updateProfile() {
    return 1;
  }

  // @Post('signup')
  // @ApiCreatedResponse({
  //   type: UserResDto,
  // })
  // @ApiProtectHeader()
  // @UseGuards(ProtectGuard, CaptchaGuard)
  // async signup(
  //   @Body() body: SignupDto,
  //   @Res() res: FastifyReply,
  //   @Session() session: FastifyRequest['session'],
  // ) {
  //   const r = await this.userService.signup({
  //     signupType: SignupType.letscollab,
  //     username: body.username,
  //     password: body.password,
  //     email: body.email,
  //     nickname: body.nickname,
  //   });

  //   if (r.code > 0) {
  //     session.user = {
  //       loggedIn: false,
  //       username: r.d.username,
  //       id: r.d.id,
  //     };
  //   }

  //   res.send(r);
  // }
}
