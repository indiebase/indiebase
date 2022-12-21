import { CoProtectGuard } from './../utils/guards';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserInfo } from '@letscollab-nest/helper';
import { UpdateUserProfileDto } from './user.dto';
import { UserSession } from '@letscollab-nest/trait';
import { UserService } from './user.service';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard)
  async getUserList(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    return res.send({ token: 1 });
  }

  @Get('profile')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard)
  @ApiOperation({
    summary: 'Get user profile',
  })
  async getProfile(@UserInfo() info: UserSession) {
    return this.userService.getUser([{ id: info.id }]);
  }

  @Post('profile/sync')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard)
  @ApiOperation({
    summary: 'Sync profile with platform. e.g. Github',
  })
  async syncProfile(@UserInfo() info: UserSession) {}

  @Post('possession')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard)
  @ApiOperation({
    summary: 'Sync profile with platform. e.g. Github',
  })
  async getPossession(@UserInfo() info: UserSession) {
    return this.userService.getUser([{ id: info.id }]);
  }

  @Patch('profile')
  @ApiOperation({
    summary: 'Update a user profile',
  })
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard)
  async updateUserProfile(
    @Body() body: UpdateUserProfileDto,
    @UserInfo() info: UserSession,
  ) {
    console.log(info);
    const { password, email } = body;
    return this.userService.updateUser({ id: info.id }, { password, email });
  }
}
