import { CoProtectGuard } from '../utils';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCookieAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  ResultCode,
  MyInfo,
  AccessGuard,
  Domain,
  DevApiHeader,
  ProtectGuard,
} from '@letscollab-nest/helper';
import { OwnOrgsResDto, QueryUserDto, UpdateUserProfileDto } from './user.dto';
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
    const { list, total } = await this.userService.getUsers(query);
    return {
      code: ResultCode.SUCCESS,
      total,
      d: list,
    };
  }

  @Get('list/:username')
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

  @Get('profile')
  @ApiCookieAuth('SID')
  @UseGuards(CoProtectGuard, AccessGuard)
  @ApiOperation({
    summary: 'Get my profile',
  })
  async getMyProfile(@MyInfo('id') id: number) {
    const user = await this.userService.getProfile(id);
    return {
      code: ResultCode.SUCCESS,
      d: user,
    };
  }

  @Get('orgs')
  @ApiCookieAuth('SID')
  @ApiOperation({
    summary: 'Gets the owned organization',
  })
  @ApiOkResponse({
    type: OwnOrgsResDto,
  })
  @UseGuards(ProtectGuard, AccessGuard)
  async queryOwnOrgs(@MyInfo('id') id: number) {
    const d = await this.userService.getOwnedOrganizations(id);

    return {
      code: ResultCode.SUCCESS,
      d,
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
    @Domain() domain: string,
  ) {
    const d = await this.userService.getUserPossession(username, [domain]);
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }
}
