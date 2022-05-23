import { GetCaptchaDto } from './mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import type { Redis } from 'ioredis';
import { Captcha } from '@letscollab/helper';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    // private readonly logger: Logger,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  public async sendCaptchaEmail(body: GetCaptchaDto) {
    const captcha = parseInt(Math.random().toString().slice(2, 7));
    const subject = '注册验证';

    return this.mailerService
      .sendMail({
        to: body.account,
        subject,
        template: 'mail-captcha.hbs',
        context: {
          captcha,
          subject,
          addition: '',
        },
      })
      .then(async () => {
        await this.redis.setex(
          Captcha.getSignupCaptchaToken(captcha, body.account),
          3000,
          captcha,
        );

        return {};
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
