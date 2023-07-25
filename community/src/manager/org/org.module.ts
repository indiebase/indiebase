import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgService } from './org.service';
import { OrgController } from './org.controller';

@Module({
  controllers: [OrgController],
  providers: [Logger, OrgService],
  exports: [OrgService],
})
export class OrgModule {}
