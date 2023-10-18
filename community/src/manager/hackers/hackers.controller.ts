import {
  OkResponseSchema,
  PublicApiGuard,
  SecurityApiHeader,
} from '@indiebase/server-shared';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateHackersDto } from './hackers.dto';

@Controller({
  path: 'mgr/hackers',
  version: '1',
})
@ApiTags('Hackers/v1')
export class HackersController {
  // constructor(private readonly pasetoService: PasetoService) {}

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
    console.log(body);
    return 1;
  }
}
