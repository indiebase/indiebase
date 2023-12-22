import {
  genDevPublicApiKey,
  IsEntityExistedConstraint,
  PresetMiddlewareModule,
} from '@indiebase/server-shared';
import type { ModuleMetadata, OnModuleInit } from '@nestjs/common';
import { Logger, Module } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config';

import { AuthModule } from './auth';
import type { DepsDynamicOptions } from './dependencies.module';
import { createDependenciesModule } from './dependencies.module';
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
  const { imports, ...depsOptions } = options;

  @Module({
    imports: [
      ProbeModule,
      MgrModule,
      AuthModule,
      UsersModule,
      StorageModule,
      MigrationModule,
      PresetModule,
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
