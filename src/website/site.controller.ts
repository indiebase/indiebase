import { Get } from '@nestjs/common';
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';

@Controller('site')
export class SiteController {
  @Get('banner')
  async getBanners() {}

  @Get('announce')
  async getAnnouncement() {}
}
