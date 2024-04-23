import { Logger, Module } from '@nestjs/common';

import { MgrAuthController } from './mgr-auth.controller';
import { MgrAuthService } from './mgr-auth.service';

@Module({
  controllers: [MgrAuthController],
  providers: [Logger, MgrAuthService],
  exports: [MgrAuthService],
})
export class MgrAuthModule {}
