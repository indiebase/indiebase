import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestMiddleware } from './request.middleware';

@Module({
  providers: [RequestMiddleware],
  exports: [RequestMiddleware],
})
export class AsyncContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
