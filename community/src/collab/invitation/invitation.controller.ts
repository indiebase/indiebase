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
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InviteMemberDto } from './invitation.dto';

@Controller('v1/collab/invitation')
@ApiTags('v1/Invitation')
export class InvitationController {
  constructor() {}

  @MessagePattern({ cmd: 'get_name' })
  async getUser(@Payload() username: string) {}

  @Get('list')
  @ApiCookieAuth('SID')
  // @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Query() query: any) {
    return {};
    // return this.invitationService.queryTeam(query);
  }

  @Put('update')
  @ApiCookieAuth('SID')
  // @UseGuards(Http2RmqAuthGuard)
  async updateTeam(@Body() body: any) {
    return {};
    // return this.invitationService.updateTeam(body);
  }

  @Post()
  @ApiCookieAuth('SID')
  @UseGuards()
  async inviteMember(@Body() body: InviteMemberDto, @Req() req: { user: any }) {
    return {};
    // return this.invitationService.inviteMember(body, req.user.body);
  }

  @Get('confirm')
  @ApiCookieAuth('SID')
  @UseGuards()
  async confirmInviteMember(@Body() body: any) {
    return {};
    // return this.invitationService.updateTeam(body);
  }
}
