import { InjectRedis } from '@indiebase/nestjs-redis';
import { CaptchaUtils } from '@indiebase/server-shared';
import { VerifyCaptchaEmail } from '@indiebase/transactional';
import { Logger } from '@nestjs/common';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { render } from '@react-email/render';
import { Redis } from 'ioredis';

import { SendCaptchaDTO } from './mail.dto';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly logger: Logger,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  public async sendCaptcha({ email }: SendCaptchaDTO) {
    const captcha = Math.random().toString().slice(2, 7);
    const subject = 'Captcha';
    const validityDuration = 10;

    const html = render(
      VerifyCaptchaEmail({
        service: 'Indiebase',
        verificationCode: captcha,
        account: email,
        validityDuration: validityDuration + 'minutes',
      }),
    );

    return this.mailerService
      .sendMail({
        to: email,
        subject,
        html,
      })
      .then(async () => {
        await this.redis.setex(
          CaptchaUtils.getSignupCaptchaToken(captcha, email),
          validityDuration * 60,
          captcha,
        );
      })
      .catch((e) => {
        this.logger.error(e);
        throw new InternalServerErrorException();
      });
  }
}
