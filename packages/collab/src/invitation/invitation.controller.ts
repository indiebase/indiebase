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
import { InvitationService } from './invitation.service';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { InviteMemberDto } from './invitation.dto';
import { RpcSessionAuthzClientGuard } from '@letscollab-nest/helper';

@Controller('v1/collab/invitation')
@ApiTags('v1/Invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @MessagePattern({ cmd: 'get_name' })
  async getUser(@Payload() username: string) {}

  @Get('list')
  @ApiCookieAuth('SID')
  // @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Query() query) {
    // return this.invitationService.queryTeam(query);
  }

  @Put('update')
  @ApiCookieAuth('SID')
  // @UseGuards(Http2RmqAuthGuard)
  async updateTeam(@Body() body) {
    // return this.invitationService.updateTeam(body);
  }

  @Post()
  @ApiCookieAuth('SID')
  @UseGuards(RpcSessionAuthzClientGuard)
  async inviteMember(@Body() body: InviteMemberDto, @Req() req: { user: any }) {
    return this.invitationService.inviteMember(body, req.user.body);
  }

  @Get('confirm')
  @ApiCookieAuth('SID')
  @UseGuards(RpcSessionAuthzClientGuard)
  async confirmInviteMember(@Body() body) {
    // return this.invitationService.updateTeam(body);
  }
}
