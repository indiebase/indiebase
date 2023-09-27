import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PasetoAuthGuard } from '~/auth/paseto.guard';
import { LocalAuthGuard } from '..';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('User/v1')
// @ApiBearerAuth('paseto-token')
export class UserController {
  // constructor(private readonly pasetoService: PasetoService) {}

  @Get('demo')
  @UseGuards(LocalAuthGuard, PasetoAuthGuard)
  async demo() {
    return 1;
    // return this.pasetoService.sign({ demo: 11 });
  }
}
