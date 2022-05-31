import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { TeamService } from './team.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Http2RmqAuthGuard } from 'src/guard/rmq-auth.guard';
import {
  CreateTeamDto,
  DeleteTeamDto,
  InviteMemberDto,
  UpdateTeamDto,
} from './team.dto';

@Controller('team')
@ApiTags('v1/Team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @MessagePattern({ cmd: 'get_name' })
  async getUser(@Payload() username: string) {}

  @Get('query')
  @ApiBearerAuth('jwt')
  @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Req() req: FastifyRequest) {
    return 1;
  }

  @Post('create')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async createTeam(@Body() body: CreateTeamDto) {
    return this.teamService.createTeam(body);
  }

  @Put('update')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async updateTeam(@Body() body: UpdateTeamDto) {
    return this.teamService.updateTeam(body);
  }

  @Post('invite')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async inviteMember(@Body() body: InviteMemberDto) {
    return this.teamService.inviteMember(body);
  }

  @Get('invite/confirm')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async confirmInviteMember(@Body() body: UpdateTeamDto) {
    return this.teamService.updateTeam(body);
  }

  @Delete('delete')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: DeleteTeamDto) {
    return this.teamService.deleteTeam(body);
  }
}
