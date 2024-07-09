import { Logger, Module } from '@nestjs/common';

import { OrgsController } from './orgs.controller';
import { OrgsService } from './orgs.service';

@Module({
  controllers: [OrgsController],
  providers: [Logger, OrgsService],
  exports: [OrgsService],
})
export class OrgsModule {}
