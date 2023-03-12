import { OrgController } from './org.controller';
import { Logger, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgEntity } from './org.entity';
import { OrgService } from './org.service';
import { UserModule } from '../user/user.module';
import { ProjectEntity } from '../project/project.entity';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrgEntity, ProjectEntity]),
    UserModule,
    ProjectModule,
  ],
  controllers: [OrgController],
  providers: [Logger, OrgService],
  exports: [OrgService],
})
export class OrgModule {}
