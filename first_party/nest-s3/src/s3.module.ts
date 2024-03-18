/**
 * Copyright (C) 2022 Han
 * Copyright (C)  svtslv (https://github.com/svtslv)
 *
 * SPDX-License-Identifier: MIT
 * SPDX-License-Identifier: Apache-2.0
 */

import type { DynamicModule} from '@nestjs/common';
import { Module } from '@nestjs/common';

import { S3CoreModule } from './s3.core-module';
import type { S3ModuleAsyncOptions, S3ModuleOptions } from './s3.interfaces';

@Module({})
export class S3Module {
  public static forRoot(
    options: S3ModuleOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: S3Module,
      imports: [S3CoreModule.forRoot(options, connection)],
      exports: [S3CoreModule],
    };
  }

  public static forRootAsync(
    options: S3ModuleAsyncOptions,
    connection?: string,
  ): DynamicModule {
    return {
      module: S3Module,
      imports: [S3CoreModule.forRootAsync(options, connection)],
      exports: [S3CoreModule],
    };
  }
}
