import { OrgController } from './org.controller';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgEntity } from './org.entity';
import { OrgService } from './org.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrgEntity])],
  controllers: [OrgController],
  providers: [Logger, OrgService],
  exports: [OrgService],
})
export class OrgModule {}
