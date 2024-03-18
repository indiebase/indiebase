import { OkResponseSchema } from '@indiebase/server-shared';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { PasetoAuthGuard } from '../auth/paseto.guard';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('User/v1')
export class UsersController {
  // constructor(private readonly pasetoService: PasetoService) {}

  @ApiOperation({
    summary: 'Sign up a user',
  })
  @ApiOkResponse({
    type: OkResponseSchema,
  })
  @ApiBearerAuth('paseto')
  @UseGuards()
  @Post('signup')
  async demo() {
    return 1;
    // return this.pasetoService.sign({ demo: 11 });
  }
}
