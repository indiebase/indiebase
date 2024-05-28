import {
  genDevPublicApiKey,
  IsEntityExistedConstraint,
  PresetMiddlewareModule,
} from '@indiebase/server-shared';
import { ModuleMetadata, OnModuleInit } from '@nestjs/common';
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthModule } from './auth';
import { DepsDynamicOptions } from './dependencies.module';
import { createDependenciesModule } from './dependencies.module';
import { MailModule } from './mail';
import { MgrModule } from './manager/mgr.module';
import { MigrationModule } from './migrations';
import { PresetModule } from './modules';
import { ProbeModule } from './probe';
import { StorageModule } from './storage';
import { UsersModule } from './users/users.module';

/**
 * This module is the basic module of Lets, which contains the basic functions of community:
 *
 * @param {NonNullable<ModuleMetadata>} options
 */
export const createCommunityModule = function (
  options: NonNullable<ModuleMetadata> & DepsDynamicOptions,
) {
  const { imports = [], providers = [], ...depsOptions } = options;

  @Module({
    imports: [
      ProbeModule,
      MgrModule,
      AuthModule,
      MailModule,
      UsersModule,
      StorageModule,
      MigrationModule,
      PresetModule,
      PresetMiddlewareModule,
      ...imports,
      createDependenciesModule(depsOptions),
    ],
    providers: [Logger, IsEntityExistedConstraint, ...providers],
  })
  class CommunityModule implements OnModuleInit {
    constructor(
      private readonly logger: Logger,
      private readonly config: ConfigService,
    ) {}
    async onModuleInit() {
      if (kDevMode) {
        const salt = this.config.get('security.publicApiGuardSalt');
        this.logger.debug('Public API Key: ' + genDevPublicApiKey(salt));
      }
    }
  }

  return CommunityModule as any;
};
