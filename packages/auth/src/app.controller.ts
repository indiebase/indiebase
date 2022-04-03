import { Controller, Get } from '@nestjs/common';

@Controller('health')
export default class AppController {
  @Get('check')
  async demo1() {
    return 'Healthy';
  }
}
