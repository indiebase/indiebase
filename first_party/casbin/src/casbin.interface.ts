import { Type, DynamicModule, ForwardReference } from '@nestjs/common';

export interface CasbinOptions {
  model: string;

  adapter: string | any;

  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
}

export interface CasbinAsyncOptions<T = CasbinOptions> {
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory: (...args: any[]) => T | Promise<T>;

  inject?: any[];

  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
}
