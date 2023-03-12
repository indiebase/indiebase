import { Module } from '@nestjs/common';
import { MailModule } from './mail';

@Module({
  imports: [MailModule],
})
export class MsgModule {}
