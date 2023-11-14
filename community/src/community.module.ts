import {
  IsEntityExistedConstraint,
  KnexEx,
  PresetMiddlewareModule,
  TmplMetaTables,
  genDevPublicApiKey,
} from '@indiebase/server-shared';
import { Logger, Module, ModuleMetadata, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth';
import {
  DepsDynamicOptions,
  createDependenciesModule,
} from './dependencies.module';
import { MgrModule } from './manager/mgr.module';
import { MigrationModule } from './migrations';
import { ProbeModule } from './probe';
import { StorageModule } from './storage';
import { UsersModule } from './users/users.module';
import { AccessService } from '@indiebase/nest-ac';
import { InjectKnex, InjectKnexEx } from '@indiebase/nest-knex';
import { Knex } from 'knex';

/**
 * This module is the basic module of Lets, which contains the basic functions of community:
 *
 * @param {NonNullable<ModuleMetadata>} options
 */
export const createCommunityModule = function (
  options: NonNullable<ModuleMetadata> & DepsDynamicOptions,
) {
  const { imports, ...depsOptions } = options;

  @Module({
    imports: [
      ProbeModule,
      MgrModule,
      AuthModule,
      UsersModule,
      StorageModule,
      MigrationModule,
      ...imports,
      PresetMiddlewareModule,
      createDependenciesModule(depsOptions),
    ],
    providers: [
      Logger,
      IsEntityExistedConstraint,
      ...(options.providers ?? []),
    ],
  })
  class CommunityModule implements OnModuleInit {
    constructor(
      private readonly logger: Logger,
      private readonly config: ConfigService,
      private readonly ac: AccessService,
      @InjectKnex()
      private readonly knex: Knex,
      @InjectKnexEx()
      private readonly knexEx: KnexEx,
    ) {}
    async onModuleInit() {
      const projects = await this.knexEx.listProjects();

      // projects.push({ namespace: 'mgr' });

      for (const prj of projects) {
        this.knex
          .withSchema(prj.namespace)
          .select('*')
          .from(TmplMetaTables.roles);
        // this.ac.setNamespace(ns).setGrants()
      }

      if (kDevMode) {
        const salt = this.config.get('security.publicApiGuardSalt');
        this.logger.debug('Public API Key: ' + genDevPublicApiKey(salt));
      }
    }
  }

  return CommunityModule as any;
};
