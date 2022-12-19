import { OrgController } from './org.controller';
import { Logger, Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [OrgController],
  providers: [Logger],
})
export class OrgModule {}
