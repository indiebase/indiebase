import { Body, Controller, Post } from '@nestjs/common';
import { GetCaptchaDto } from './mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  async sendCaptcha() {}

  @Post('get-captcha')
  async getCaptcha(@Body() body: GetCaptchaDto) {
    
  }
}
