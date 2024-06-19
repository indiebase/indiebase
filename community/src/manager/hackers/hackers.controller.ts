import { AccessActions, UseAccess } from '@indiebase/nest-accesscontrol';
import { ResultCode } from '@indiebase/sdk';
import {
  AccessGuard,
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  ManagerResources,
  PublicApiGuard,
} from '@indiebase/server-shared';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PasetoAuthGuard } from '../../auth';
import { CreateHackersDTO, HackerDTO } from './hackers.dto';
import { HackersService } from './hackers.service';

@Controller({
  path: 'mgr/hackers',
  version: '1',
})
@ApiTags('Hackers/v1')
export class HackersController {
  constructor(private readonly hackers: HackersService) {}

  @ApiOperation({
    summary: 'List hackers',
  })
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @ApiUnionResponse('paginated', HackerDTO)
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.hackers]: [AccessActions.readAny],
  })
  @Get()
  async list() {
    this.hackers.list();
  }

  @ApiOperation({
    summary: 'Sign up a hacker',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard)
  @Post('signup')
  async signup(@Body() body: CreateHackersDTO) {
    await this.hackers.create(body);

    return data({
      code: ResultCode.SUCCESS,
      message: 'Sign up successfully.',
    });
  }

  @ApiOperation({
    summary: 'Create a hacker',
    description: 'Must have the create hacker permission',
  })
  @ApiUnionResponse('created')
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.hackers]: [AccessActions.createAny],
  })
  @Post('hacker')
  async create(@Body() body: CreateHackersDTO) {
    await this.hackers.create(body);

    return data({
      code: ResultCode.SUCCESS,
      message: 'Create successfully.',
    });
  }
}
