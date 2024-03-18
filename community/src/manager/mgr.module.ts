import { Module } from '@nestjs/common';

import { HackersModule } from './hackers/hackers.module';
import { OrgsModule } from './orgs/orgs.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [HackersModule, OrgsModule, ProjectsModule],
  exports: [HackersModule, OrgsModule, ProjectsModule],
})
export class MgrModule {}
