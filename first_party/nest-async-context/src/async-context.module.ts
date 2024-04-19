import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { RequestMiddleware } from './request.middleware';

/**
 * https://docs.nestjs.com/recipes/async-local-storage
 *
 *@example Inject request into class-validator.
 *```
 * @Module({
 *  imports: [
 *    AsyncContextModule
 *  ]
 * })
 * class App{}
 *```
 *
 */
@Module({
  providers: [RequestMiddleware],
  exports: [RequestMiddleware],
})
export class AsyncContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
