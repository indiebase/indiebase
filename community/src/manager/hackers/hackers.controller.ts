import {
  OkResponseSchema,
  PublicApiGuard,
  ProtectApiHeader,
} from '@indiebase/server-shared';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateHackersDTO } from './hackers.dto';
import { HackersService } from './hackers.service';
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
  @ProtectApiHeader()
  @UseGuards(PublicApiGuard)
  @Post('signup')
  async signup(@Body() body: CreateHackersDTO) {
    await this.hackers.create(body);

    return {
      code: ResultCode.SUCCESS,
      message: 'Sign up successfully.',
    };
  }
}
