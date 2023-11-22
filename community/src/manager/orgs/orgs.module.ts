import { Logger, Module } from '@nestjs/common';
import { OrgsService } from './orgs.service';
import { OrgsController } from './orgs.controller';

@Module({
  controllers: [OrgsController],
  providers: [Logger, OrgsService],
  exports: [OrgsService],
})
export class OrgsModule {}
