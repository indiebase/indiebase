/**
 * Copyright (C) 2022 Han
 * Copyright (C)  svtslv (https://github.com/svtslv)
 *
 * SPDX-License-Identifier: MIT
 * SPDX-License-Identifier: Apache-2.0
 */

import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { DockerCoreModule } from './s3.core-module';
import { S3ModuleAsyncOptions, S3ModuleOptions } from './s3.interfaces';

@Module({})
export class S3Module {
  public static forRoot(
    options: S3ModuleOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: S3Module,
      imports: [DockerCoreModule.forRoot(options, connection)],
      exports: [DockerCoreModule],
    };
  }

  public static forRootAsync(
    options: S3ModuleAsyncOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: S3Module,
      imports: [DockerCoreModule.forRootAsync(options, connection!)],
      exports: [DockerCoreModule],
    };
  }
}
