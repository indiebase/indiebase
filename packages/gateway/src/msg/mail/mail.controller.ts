import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCaptchaDto } from './mail.dto';

@Controller('v1/msg/mail')
@ApiTags('v1/mail')
export class MailController {
  constructor() {}

  @Post('send-captcha')
  async sendCaptcha(@Body() body: GetCaptchaDto) {
    // return this.mailService.sendCaptchaEmail(body);
  }
}
