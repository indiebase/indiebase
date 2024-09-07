/**
 * Copyright (C) 2022 Han
 * Copyright (C)  svtslv (https://github.com/svtslv)
 *
 * SPDX-License-Identifier: MIT
 * SPDX-License-Identifier: Apache-2.0
 */

import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { DockerCoreModule } from './docker.core-module';
import { DockerModuleAsyncOptions } from './docker.interfaces';

@Module({})
export class DockerModule {
  public static forRootAsync(options: DockerModuleAsyncOptions): DynamicModule {
    return {
      module: DockerModule,
      imports: [DockerCoreModule.forRootAsync(options)],
      exports: [DockerCoreModule],
    };
  }
}
