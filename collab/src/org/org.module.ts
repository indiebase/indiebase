import { OrgController } from './org.controller';
import { Logger, Module, forwardRef } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [OrgController],
  providers: [Logger],
  exports: [],
})
export class DemoOrgModule {}
