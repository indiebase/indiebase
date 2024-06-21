import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { MountProjectMiddleware } from './mount-project.middleware';

@Module({
  providers: [MountProjectMiddleware],
  exports: [MountProjectMiddleware],
})
export class PresetMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(MountProjectMiddleware)
      .exclude('v1/mgr/(.*)')
      .forRoutes('v1/(.*)');
  }
}
