import { CoProtectGuard } from '../utils';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';
import {
  ResultCode,
  MyInfo,
  AccessGuard,
  PackageName,
  DevApiHeader,
} from '@letscollab-nest/helper';
import { QueryUserDto, UpdateUserProfileDto } from './user.dto';
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

  @Get('profile/:username')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiOperation({
    summary: 'Get a user profile',
  })
  @UseAccess({
    action: AccessAction.readAny,
    resource: UserResource.list,
  })
  async getProfile(@Param('username') username: string) {
    const user = await this.userService.getUser({ username });
    return {
      code: ResultCode.SUCCESS,
      d: user,
    };
  }

  @Put('profile')
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

  @Get('possession')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiOperation({
    summary: 'Getting user owns resources',
  })
  @DevApiHeader()
  async getMyPossession(
    @MyInfo('username') username: string,
    @PackageName() packageName: string,
  ) {
    const d = await this.userService.getUserPossession(username, [packageName]);
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }
}
