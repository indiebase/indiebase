import { UseAccess, AccessAction } from '@letscollab-nest/accesscontrol';
import {
  ProtectGuard,
  AccessGuard,
  BaseResSchemaDto,
  MyInfo,
  ResultCode,
} from '@letscollab-nest/helper';
import { OrgResource, UserSession } from '@letscollab-nest/trait';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrgDto } from '../org/org.dto';
import { InviteMembersDto } from './invitation.dto';
import { InvitationService } from './invitation.service';

@Controller({
  path: 'invitation',
  version: '1',
})
@ApiTags('v1/Invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @ApiOperation({
    summary: 'Get invitations',
  })
  @Get('org/:name')
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, AccessGuard)
  @ApiOkResponse({
    type: BaseResSchemaDto,
  })
  async getInvitation(@Body() body: CreateOrgDto, @MyInfo('id') id: number) {
    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }

  @ApiOperation({
    summary: 'Create an organization invitation0',
  })
  @Post('org/:name')
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, AccessGuard)
  @ApiOkResponse({
    type: BaseResSchemaDto,
  })
  async createInvitations(
    @Body() body: CreateOrgDto,
    @MyInfo('id') id: number,
  ) {
    return { code: ResultCode.SUCCESS, message: 'Created successfully' };
  }

  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, AccessGuard)
  async queryUsers(@Query() query: any) {
    return {};
    // return this.invitationService.queryTeam(query);
  }

  @Put('update')
  @ApiOperation({
    summary: 'Fetch github orgs',
  })
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, AccessGuard)
  async updateTeam(@Body() body: any) {
    return {};
    // return this.invitationService.updateTeam(body);
  }

  @Get('confirm')
  @ApiCookieAuth('SID')
  @UseGuards()
  async confirmInviteMember(@Body() body: any) {
    return {};
    // return this.invitationService.updateTeam(body);
  }

  @Post()
  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, AccessGuard)
  async inviteMember(
    @Body() body: InviteMembersDto,
    @MyInfo() user: UserSession,
  ) {
    this.invitationService.inviteMembers(body, user);
    return {};
  }
}
