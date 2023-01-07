import { OrgController } from './org.controller';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgEntity } from './org.entity';
import { OrgService } from './org.service';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrgEntity]), UserModule],
  controllers: [OrgController],
  providers: [Logger, OrgService],
  exports: [OrgService],
})
export class OrgModule {}
