import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
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
  MicroserviceExceptionFilter,
  ProtectGuard,
  RpcSessionAuthClientGuard,
  UserInfo,
} from '@letscollab/helper';
import { SignupType } from './user.enum';
import { UserSession } from '@letscollab/auth';

@Controller('v1/user')
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_complete_name' })
  async getFullUser(@Payload() username: string) {
    return this.userService.getUser([{ username }], { rpc: true, full: true });
  }

  @MessagePattern({ cmd: 'get_name' })
  async getName(@Payload() username: string) {
    return this.userService.getUser([{ username }], { rpc: true });
  }

  @MessagePattern({ cmd: 'get_id' })
  async getId(@Payload() id: number) {
    return this.userService.getUser([{ id }], { rpc: true });
  }

  @UseFilters(MicroserviceExceptionFilter)
  @MessagePattern({ cmd: 'signin_github' })
  async signupGithub(@Payload() profile) {
    const { _json: json, username, profileUrl, id, displayName } = profile;

    return this.userService.signIn({
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
  @UseGuards(ProtectGuard, RpcSessionAuthClientGuard)
  async getUserList(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return res.send({ token: 1 });
  }

  @Get('profile')
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, RpcSessionAuthClientGuard)
  @ApiOperation({
    summary: 'Get user',
  })
  async getProfile(@UserInfo() info: UserSession) {
    const user = await this.userService.getUser([{ id: info.id }]);
    return user;
  }

  @Post('profile/sync')
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, RpcSessionAuthClientGuard)
  @ApiOperation({
    summary: 'Sync profile with platform. e.g. Github',
  })
  async syncProfile(@UserInfo() info: UserSession) {
    const user = await this.userService.getUser([{ id: info.id }]);
    return user;
  }

  @Patch('profile')
  @ApiOperation({
    summary: 'Update a user profile',
  })
  @UseGuards(ProtectGuard)
  @UseGuards(RpcSessionAuthClientGuard)
  async updateProfile(@UserInfo() info: UserSession, @Body() body) {
    // return this.userService.updateUser({id: info.id});
    return;
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
