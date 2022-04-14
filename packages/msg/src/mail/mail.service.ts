import { GetCaptchaDto } from './mail.dto';
/*
https://docs.nestjs.com/providers#services
*/

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import type { Redis } from 'ioredis';
import { Captcha } from '@letscollab/common';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  public async sendCaptchaEmail(body: GetCaptchaDto) {
    const captcha = parseInt(Math.random().toString().slice(2, 7));
    const subject = '注册验证';

    await this.mailerService
      .sendMail({
        to: body.account,
        subject,
        template: 'mail-captcha.hbs',
        context: {
          captcha,
          subject,
        },
      })
      .catch((e) => {
        console.log(e);
      });

    await this.redis.setex(
      Captcha.getSignupCaptchaToken(captcha, body.account),
      3000,
      captcha,
    );
  }
}
