import { Module } from '@nestjs/common';

import { HackersModule } from './hackers/hackers.module';
import { OrgsModule } from './orgs/orgs.module';
import { ProjectsModule } from './projects/projects.module';
import { MgrAuthModule } from './auth/mgr-auth.module';

@Module({
  imports: [HackersModule, OrgsModule, ProjectsModule, MgrAuthModule],
  exports: [HackersModule, OrgsModule, ProjectsModule, MgrAuthModule],
})
export class MgrModule {}
