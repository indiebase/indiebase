import { AccessActions, UseAccess } from '@indiebase/nest-ac';
import {
  AccessGuard,
  CommonApiHeader,
  OkResponseSchema,
  ProtectApiHeader,
  PublicApiGuard,
  User,
} from '@indiebase/server-shared';
import type { PrimitiveUser} from '@indiebase/trait';
import { ResultCode } from '@indiebase/trait';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { PasetoAuthGuard } from '../../auth';
import type { CreateHackersDTO } from './hackers.dto';
import type { HackersService } from './hackers.service';

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
  @ApiOkResponse({
    type: OkResponseSchema,
  })
  // @UseGuards(PasetoAuthGuard, AccessGuard)
  @ApiBearerAuth('paseto')
  @Get()
  async list() {
    return 1;
  }

  @ApiOperation({
    summary: 'Sign up a hacker',
  })
  @ApiOkResponse({
    type: OkResponseSchema,
  })
  @ProtectApiHeader()
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
  @ApiOkResponse({
    type: OkResponseSchema,
  })
  @ApiBearerAuth('paseto')
  @CommonApiHeader()
  @ProtectApiHeader()
  @UseGuards(PublicApiGuard, PasetoAuthGuard, AccessGuard)
  @UseAccess({
    hacker: [AccessActions.deleteAny],
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
