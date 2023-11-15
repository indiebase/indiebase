import { PasetoAuthGuard } from '../../auth';
import {
  OkResponseSchema,
  PublicApiGuard,
  ProtectApiHeader,
  AccessGuard,
  CommonApiHeader,
} from '@indiebase/server-shared';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateHackersDTO } from './hackers.dto';
import { HackersService } from './hackers.service';
import { ResultCode } from '@indiebase/trait';
import { AccessActions, UseAccess } from '@indiebase/nest-ac';

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
    hacker: [AccessActions.deleteOwn],
  })
  @Post('hacker')
  async hacker(@Body() body: CreateHackersDTO, @Req() req) {
    console.log(req.user);
    await this.hackers.create(body);

    return {
      code: ResultCode.SUCCESS,
      message: 'Sign up successfully.',
    };
  }
}
