import type { Provider } from '@nestjs/common';
import type { ClientOptions } from 'nacos';

import { NACOS_CONFIG_OPTIONS, NACOS_NAMING_OPTIONS } from './nacos.constants';
import type { NacosConfigClientAsyncOptions } from './nacos-config.interface';
import type {
  NacosNamingClientAsyncOptions,
  NacosNamingClientOptions,
} from './nacos-naming.interface';

export const createNacosNamingClientProvider = function (
  options?: NacosNamingClientOptions,
): Provider {
  return {
    provide: NACOS_NAMING_OPTIONS,
    useValue: options,
  };
};

export const createNacosNamingClientAsyncProvider = function (
  options?: NacosNamingClientAsyncOptions,
): Provider {
  return {
    provide: NACOS_NAMING_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject,
  };
};

export const createNacosConfigClientProvider = function (
  options?: ClientOptions,
): Provider {
  return {
    provide: NACOS_CONFIG_OPTIONS,
    useValue: options,
  };
};

export const createNacosConfigClientAsyncProvider = function (
  options?: NacosConfigClientAsyncOptions,
): Provider {
  return {
    provide: NACOS_CONFIG_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject,
  };
};
