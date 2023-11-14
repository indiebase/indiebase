import { Type, DynamicModule, ForwardReference } from '@nestjs/common';

export interface AccessOptions {
  model?: any;

  getUserFromRequest?<Req = any>(request: Req): any;

  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
}

export interface AccessAsyncOptions<T = AccessOptions> {
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory: (...args: any[]) => T | Promise<T>;

  inject?: any[];

  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
}
