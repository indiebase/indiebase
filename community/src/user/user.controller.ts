import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PasetoService } from 'nestjs-paseto';

@Controller({
  path: 'user',
  version: '1',
})
@ApiTags('v1/User')
// @ApiBearerAuth('paseto-token')
export class UserController {
  // constructor(private readonly pasetoService: PasetoService) {}

  @Get('demo')
  async demo() {
    // return this.pasetoService.sign({ demo: 11 });
  }
}
