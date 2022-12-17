import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiTags, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  MicroserviceExceptionFilter,
  ProtectGuard,
  RpcSessionAuthzClientGuard,
  UserInfo,
} from '@letscollab-nest/helper';
import { UpdateUserProfileDto } from './user.dto';
import { UserSession } from '@letscollab-nest/trait';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly user: UserService) {}

  @MessagePattern({ cmd: 'get_complete_name' })
  async getFullUser(@Payload() username: string) {
    return this.user.getUser([{ username }], { rpc: true, full: true });
  }

  @MessagePattern({ cmd: 'get_name' })
  async getName(@Payload() username: string) {
    return this.user.getUser([{ username }], { rpc: true });
  }

  @MessagePattern({ cmd: 'get_id' })
  async getId(@Payload() id: number) {
    return this.user.getUser([{ id }], { rpc: true });
  }

  @UseFilters(MicroserviceExceptionFilter)
  @MessagePattern({ cmd: 'signin_github' })
  async signInGithub(@Payload() user: any) {
    const { profile, accessToken } = user;
    const { _json: json, username, profileUrl, id, displayName } = profile;

    return this.user.signIn({
      username: username,
      profileUrl: profileUrl,
      githubId: id,
      nickname: displayName,
      email: json?.email,
      avatar: json?.avatar_url,
      bio: json?.bio,
      githubAccessToken: accessToken,
    });
  }

  @Get('list')
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, RpcSessionAuthzClientGuard)
  async getUserList(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return res.send({ token: 1 });
  }

  @Get('profile')
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, RpcSessionAuthzClientGuard)
  @ApiOperation({
    summary: 'Get user profile',
  })
  async getProfile(@UserInfo() info: UserSession) {
    const user = await this.user.getUser([{ id: info.id }]);
    return user;
  }

  @Post('profile/sync')
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, RpcSessionAuthzClientGuard)
  @ApiOperation({
    summary: 'Sync profile with platform. e.g. Github',
  })
  async syncProfile(@UserInfo() info: UserSession) {
    const user = await this.user.getUser([{ id: info.id }]);
    return user;
  }

  @Post('possession')
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, RpcSessionAuthzClientGuard)
  @ApiOperation({
    summary: 'Sync profile with platform. e.g. Github',
  })
  async getPossession(@UserInfo() info: UserSession) {
    const user = await this.user.getUser([{ id: info.id }]);
    return user;
  }

  @Patch('profile')
  @ApiOperation({
    summary: 'Update a user profile',
  })
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, RpcSessionAuthzClientGuard)
  async updateUserProfile(
    @Body() body: UpdateUserProfileDto,
    @UserInfo() info: UserSession,
  ) {
    const { password, email } = body;
    return this.user.updateUser({ id: info.id }, { password, email });
  }
}
