import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCookieAuth,
  ApiOperation,
  ApiOkResponse,
  ApiOAuth2,
} from '@nestjs/swagger';
import {
  MyInfo,
  AccessGuard,
  Domain,
  DevApiHeader,
  PublicApiGuard,
} from '@letscollab/server-shared';
import { OwnOrgsResDto, QueryUserDto, UpdateUserProfileDto } from './user.dto';
import { ResultCode, UserResource, type UserSession } from '@letscollab/trait';
import { UserService } from './user.service';
import { UseAccess, AccessAction } from '@letscollab-nest/casbin';

@ApiOAuth2(['pets:write'])
@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('v1/User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  @ApiCookieAuth('SID')
  @UseGuards(PublicApiGuard, AccessGuard)
  @UseAccess({
    action: AccessAction.readAny,
    resource: UserResource.list,
  })
  @ApiOperation({
    description: `Require:user_list:read`,
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
  @UseGuards(PublicApiGuard, AccessGuard)
  @ApiOperation({
    summary: 'Get a user profile',
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
  @UseGuards(PublicApiGuard, AccessGuard)
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
  @UseGuards(PublicApiGuard, AccessGuard)
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
  @UseGuards(PublicApiGuard)
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
  @UseGuards(PublicApiGuard)
  @ApiOperation({
    summary: 'Sync profile with platform. e.g. Github',
  })
  async syncProfile(@MyInfo() info: UserSession) {}

  @Get('possession')
  @ApiCookieAuth('SID')
  @UseGuards(PublicApiGuard, AccessGuard)
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

  @Get('test')
  @ApiCookieAuth('SID')
  @UseGuards(PublicApiGuard, AccessGuard)
  @ApiOperation({
    summary: 'Test',
  })
  // @UseAccess({
  //   action: AccessAction.readAny,
  //   resource: UserResource.list,
  // })
  @DevApiHeader()
  async test(@Session() session, @MyInfo('username') username) {
    return {
      code: ResultCode.SUCCESS,
      d: session.get(username),
    };
  }
}
