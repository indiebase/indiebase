import { Logger,Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule],
  controllers: [MailController],
  providers: [Logger, MailService],
  exports: [MailService],
})
export class MailModule {}
