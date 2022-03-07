import { CasbinGuard } from '@letscollab/nestjs-casbin';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('health')
export default class AppController {
  @Get('check')
  @UseGuards(CasbinGuard)
  async demo1() {
    return 'Healthy';
  }
}
