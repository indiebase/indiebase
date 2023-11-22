import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MountProjectMiddleware } from './mount-project.middleware';

@Module({
  providers: [MountProjectMiddleware],
  exports: [MountProjectMiddleware],
})
export class PresetMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(MountProjectMiddleware).forRoutes('*');
  }
}
