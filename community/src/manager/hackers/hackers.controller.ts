import { AccessActions, UseAccess } from '@indiebase/nest-accesscontrol';
import {
  AccessGuard,
  ApiIndiebaseSecurity,
  ApiProjectHeader,
  ApiUnionResponse,
  ManagerResources,
  PublicApiGuard,
} from '@indiebase/server-shared';
import { ResultCode } from '@indiebase/sdk';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { PasetoAuthGuard } from '../../auth';
import { CreateHackersDTO } from './hackers.dto';
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
  @ApiIndiebaseSecurity()
  @ApiBearerAuth('paseto')
  @ApiUnionResponse('pagination')
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
  @ApiIndiebaseSecurity()
  @UseGuards(PublicApiGuard)
  @Post('signup')
  async signup(@Body() body: CreateHackersDTO) {
    await this.hackers.create(body);

    return {
      code: ResultCode.SUCCESS,
      message: 'Sign up successfully.',
    };
  }

  @ApiOperation({
    summary: 'Create a hacker',
    description: 'Must have the create hacker permission',
  })
  @ApiUnionResponse()
  @ApiIndiebaseSecurity()
  @ApiBearerAuth('paseto')
  @ApiProjectHeader()
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    [ManagerResources.hackers]: [AccessActions.createAny],
  })
  @Post('hacker')
  async create(@Body() body: CreateHackersDTO) {
    await this.hackers.create(body);

    return {
      code: ResultCode.SUCCESS,
      message: 'Create successfully.',
    };
  }
}
