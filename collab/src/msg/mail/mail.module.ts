import { MailController } from './mail.controller';
import { Module, Logger } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule],
  controllers: [MailController],
  providers: [Logger, MailService],
  exports: [MailService],
})
export class MailModule {}
