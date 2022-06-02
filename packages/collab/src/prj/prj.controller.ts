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
import { PrjService } from './prj.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Http2RmqAuthGuard } from 'src/guard/rmq-auth.guard';
import { createPrjDto, UpdateTeamDto } from './prj.dto';

@Controller('prj')
@ApiTags('v1/Project')
export class PrjController {
  constructor(private readonly PrjService: PrjService) {}

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
  async createPrj(@Body() body: createPrjDto) {
    return this.PrjService.createPrj(body);
  }

  @Put('update')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async updateTeam(@Body() body: UpdateTeamDto) {
    return this.PrjService.updateTeam(body);
  }

  @Delete('delete')
  @ApiBearerAuth('jwt')
  @UseGuards(Http2RmqAuthGuard)
  async deleteTeam(@Body() body: createPrjDto) {
    return 1;
  }
}
