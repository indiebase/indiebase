import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { IsEntityExistedConstraint, KnexEx } from '@indiebase/server-shared';
import { Logger, Module, ModuleMetadata, OnModuleInit } from '@nestjs/common';
import { Knex } from 'knex';
import { AuthModule } from '~/auth';
import { MetaService } from '~/db/meta/meta.service';
import { InitializeDepsModule } from '~/deps.module';
import { OrgsModule, ProjectsModule } from '~/manager';
import { MigrationSource } from '~/migrations/MigrationSource';
import { ProbeModule } from '~/probe';
import { UsersModule } from '~/users/users.module';

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
      if (!(await this.knexEx.hasSchema('mgr'))) {
        await this.knex.schema.createSchema('mgr');
      }
      // await this.metaService.init();

      await this.knex.migrate.up({
        migrationSource: new MigrationSource('mgr'),
        tableName: 'knex_demo_migration',
        schemaName: 'mgr',
      });
    }
  }

  return CommunityModule as any;
};
