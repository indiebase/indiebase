import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { IsEntityExistedConstraint, KnexEx } from '@indiebase/server-shared';
import { Logger, Module, ModuleMetadata, OnModuleInit } from '@nestjs/common';
import { Knex } from 'knex';
import { AuthModule } from '~/auth';
import { MetaService } from '~/db/meta/meta.service';
import { InitializeDepsModule } from '~/deps.module';
import { OrgsModule, ProjectsModule } from '~/manager';
import { ProbeModule } from '~/probe';
import { UsersModule } from '~/users/users.module';
import { MetaModule } from './db/meta/meta.module';
import { DataSource } from 'typeorm';

/**
 * This module is the basic module of Lets, which contains the basic functions of community:
 *
 * @param {NonNullable<ModuleMetadata>} options
 */
export const createCommunityModule = function (
  options: NonNullable<ModuleMetadata> = {},
) {
  @Module({
    imports: [
      ProbeModule,
      UsersModule,
      AuthModule,
      OrgsModule,
      ProjectsModule,
      MetaModule,
      ...options.imports,
      InitializeDepsModule,
    ],
    providers: [
      Logger,
      IsEntityExistedConstraint,
      MetaService,
      ...(options.providers ?? []),
    ],
  })
  class CommunityModule implements OnModuleInit {
    constructor(
      private readonly metaService: MetaService,
      @InjectKnexEx()
      private readonly knexEx: KnexEx,
      @InjectKnex()
      private readonly knex: Knex,
      private readonly logger: Logger,
    ) {}
    async onModuleInit() {
      // console.log(a);
      // let s = await this.knex('ib_orgs')
      //   .withSchema('mgr')
      //   .select(
      //     'ib_orgs.id',
      //     'ib_orgs.name',
      //     'ib_projects.name as project_name',
      //   )
      //   .from('ib_orgs')
      //   .join('ib_projects', function () {
      //     this.on('ib_orgs.id', '=', 'ib_projects.org_id');
      //   })
      //   .where('ib_orgs.id', 1);
    }
  }

  return CommunityModule as any;
};
