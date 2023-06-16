import type { Provider } from '@nestjs/common';
import type { CasbinAsyncOptions, CasbinOptions } from './casbin.interface';
import { CASBIN_OPTIONS } from './casbin.constants';
import assert from 'node:assert';

export const createCasbinProvider = function (
  options: CasbinOptions,
): Provider {
  assert(
    options.adapter && options.model,
    'createCasbinProvider must provide model and adapter option',
  );

  return {
    provide: CASBIN_OPTIONS,
    useValue: options,
  };
};

export const createCasbinProviderAsync = function (
  options?: CasbinAsyncOptions,
): Provider {
  return {
    provide: CASBIN_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject,
  };
};
