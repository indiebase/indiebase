import { ResultCode } from '@indiebase/sdk';
import { data } from '@indiebase/server-shared';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetCaptchaDTO } from './mail.dto';
import { MailService } from './mail.service';

@Controller({
  path: 'mail',
  version: '1',
})
@ApiTags('Mail/v1')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-captcha')
  async sendCaptcha(@Body() body: GetCaptchaDTO) {
    await this.mailService.sendCaptchaEmail(body);

    return data({
      code: ResultCode.SUCCESS,
      message: 'Send successfully',
    });
  }
}
