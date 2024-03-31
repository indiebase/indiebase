import { AccessActions, UseAccess } from '@indiebase/nest-accesscontrol';
import {
  AccessGuard,
  ApiIndiebaseCommonHeader,
  ApiIndiebaseSecurity,
  ApiProtectionHeader,
  ApiUnionResponse,
  PublicApiGuard,
  User,
} from '@indiebase/server-shared';
import { PrimitiveUser } from '@indiebase/trait';
import { ResultCode } from '@indiebase/trait';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiUnionResponse('pagination')
  @UseGuards(PasetoAuthGuard, AccessGuard)
  @ApiIndiebaseSecurity()
  @ApiProtectionHeader()
  @UseAccess({
    hacker: [AccessActions.readAny],
  })
  @Get()
  async list() {
    return 1;
  }

  @ApiOperation({
    summary: 'Sign up a hacker',
  })
  @ApiUnionResponse()
  @ApiProtectionHeader()
  @UseGuards(PublicApiGuard)
  @Post('signup')
  async signup(@Body() body: CreateHackersDTO, @User() user: PrimitiveUser) {
    if (user) {
      throw new BadRequestException(`${user.email} already existed.`);
    }

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
  @ApiIndiebaseCommonHeader()
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    hacker: [AccessActions.createAny],
  })
  @Post('hacker')
  async create(@Body() body: CreateHackersDTO, @User() user: PrimitiveUser) {
    if (user) {
      throw new BadRequestException(`${user.email} already existed.`);
    }

    await this.hackers.create(body);

    return {
      code: ResultCode.SUCCESS,
      message: 'Sign up successfully.',
    };
  }
}
