import { CoProtectGuard } from '../utils';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import { ResultCode, MyInfo, AccessGuard } from '@letscollab-nest/helper';
import {
  QueryPossessionDto,
  QueryUserDto,
  UpdateUserProfileDto,
} from './user.dto';
import { UserResource, UserSession } from '@letscollab-nest/trait';
import { UserService } from './user.service';
import { UseAccess, AccessAction } from '@letscollab-nest/accesscontrol';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.readAny,
    resource: UserResource.list,
  })
  async getUserList(@Query() query: QueryUserDto) {
    const d = await this.userService.getUsers(query);
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @Get('profile')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiOperation({
    summary: 'Get my profile',
  })
  async getMyProfile(@MyInfo('id') id: number) {
    const user = await this.userService.getUser({ id });
    return {
      code: ResultCode.SUCCESS,
      d: user,
    };
  }

  @Get('profile/:id')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiOperation({
    summary: 'Get a user profile',
  })
  async getProfile(@Param('id') id: number) {
    const user = await this.userService.getUser({ id });
    return {
      code: ResultCode.SUCCESS,
      d: user,
    };
  }

  @Patch('profile')
  @ApiOperation({
    summary: 'Update my profile',
  })
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard)
  async updateUserProfile(
    @Body() body: UpdateUserProfileDto,
    @MyInfo('id') id: number,
  ) {
    const { password, email } = body;
    await this.userService.updateUser({ id }, { password, email });

    return {
      code: ResultCode.SUCCESS,
    };
  }

  @Post('profile/sync')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard)
  @ApiOperation({
    summary: 'Sync profile with platform. e.g. Github',
  })
  async syncProfile(@MyInfo() info: UserSession) {}

  @Post('possession')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.readAny,
    resource: UserResource.list,
  })
  @ApiOperation({
    summary: 'Getting user owns resources',
  })
  async getPossession(@Body() body: QueryPossessionDto) {
    const user = await this.userService.getUserPossession(body.username);
    return {
      code: ResultCode.SUCCESS,
      d: user,
    };
  }
}
