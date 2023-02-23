import {
  ProtectGuard,
  AccessGuard,
  BaseResSchemaDto,
  MyInfo,
} from '@letscollab-nest/helper';
import { ResultCode, UserSession } from '@letscollab-nest/trait';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
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

  @ApiCookieAuth('SID')
  @UseGuards(ProtectGuard, AccessGuard)
  async queryUsers(@Query() query: any) {
    return {};
    // return this.invitationService.queryTeam(query);
  }

  @Get('confirm')
  @ApiCookieAuth('SID')
  @UseGuards()
  async confirmInviteMember(@Body() body: any) {
    return {};
    // return this.invitationService.updateTeam(body);
  }

  @Post()
  @ApiOperation({
    summary: 'Create invitations.',
  })
  @ApiCookieAuth('SID')
  @ApiOkResponse({
    type: BaseResSchemaDto,
  })
  @UseGuards(ProtectGuard, AccessGuard)
  async inviteMember(
    @Body() body: InviteMembersDto,
    @MyInfo() user: UserSession,
  ) {
    await this.invitationService.inviteMembers(body, user);
    const { inviteesEmails, org } = body;

    return {};
  }
}
