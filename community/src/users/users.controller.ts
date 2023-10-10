import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PasetoAuthGuard } from '~/auth/paseto.guard';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('User/v1')
export class UsersController {
  // constructor(private readonly pasetoService: PasetoService) {}
  
  @Get('demo')
  @ApiBearerAuth('paseto')
  @UseGuards(PasetoAuthGuard)
  async demo() {
    return 1;
    // return this.pasetoService.sign({ demo: 11 });
  }
}
