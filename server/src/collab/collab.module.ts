import { Module } from '@nestjs/common';
import { OrgModule } from './org/org.module';

@Module({
  imports: [OrgModule],
})
export class CollabModule {}
