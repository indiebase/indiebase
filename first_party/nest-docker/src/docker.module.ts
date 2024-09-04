/**
 * Copyright (C) 2022 Han
 * Copyright (C)  svtslv (https://github.com/svtslv)
 *
 * SPDX-License-Identifier: MIT
 * SPDX-License-Identifier: Apache-2.0
 */

import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { S3CoreModule } from './docker.core-module';
import { S3ModuleAsyncOptions, S3ModuleOptions } from './docker.interfaces';

@Module({})
export class DockerModule {
  public static forRoot(
    options: S3ModuleOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: DockerModule,
      imports: [S3CoreModule.forRoot(options, connection)],
      exports: [S3CoreModule],
    };
  }

  public static forRootAsync(
    options: S3ModuleAsyncOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: DockerModule,
      imports: [S3CoreModule.forRootAsync(options, connection!)],
      exports: [S3CoreModule],
    };
  }
}
