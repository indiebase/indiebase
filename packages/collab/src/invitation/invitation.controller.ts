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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { InviteMemberDto } from './invitation.dto';
import { RpcSessionAuthClientGuard } from 'src/guard/session-rpc-auth-client.guard';

@Controller('invite')
@ApiTags('v1/Invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @MessagePattern({ cmd: 'get_name' })
  async getUser(@Payload() username: string) {}

  @Get('query')
  @ApiBearerAuth('jwt')
  @ApiOkResponse({
    // type: QueryTeamResDto,
  })
  // @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Query() query) {
    // return this.invitationService.queryTeam(query);
  }

  @Put('update')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async updateTeam(@Body() body) {
    // return this.invitationService.updateTeam(body);
  }

  @Post('create')
  @ApiBearerAuth('jwt')
  @UseGuards(RpcSessionAuthClientGuard)
  async inviteMember(@Body() body: InviteMemberDto, @Req() req: { user }) {
    return this.invitationService.inviteMember(body, req.user.body);
  }

  @Get('invite/confirm')
  @ApiBearerAuth('jwt')
  @UseGuards(RpcSessionAuthClientGuard)
  async confirmInviteMember(@Body() body) {
    // return this.invitationService.updateTeam(body);
  }
}
