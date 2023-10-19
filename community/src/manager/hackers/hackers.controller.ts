import {
  OkResponseSchema,
  PublicApiGuard,
  SecurityApiHeader,
} from '@indiebase/server-shared';
import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateHackersDto } from './hackers.dto';
import { HackersService } from './hackers.service';
import { did } from '@deskbtm/gadgets';
import { ResultCode } from '@indiebase/trait';

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
  @SecurityApiHeader()
  @UseGuards(PublicApiGuard)
  @Post('signup')
  async signup(@Body() body: CreateHackersDto) {
    await this.hackers.create(body);

    return {
      code: ResultCode.SUCCESS,
      message: 'Sign up successfully.',
    };
  }
}
