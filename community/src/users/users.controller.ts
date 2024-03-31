import { ApiUnionResponse } from '@indiebase/server-shared';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiUnionResponse()
  @ApiBearerAuth('paseto')
  @UseGuards()
  @Post('signup')
  async signUp() {
    return 1;
    // return this.pasetoService.sign({ demo: 11 });
  }
}
