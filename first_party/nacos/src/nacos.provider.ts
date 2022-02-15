import type { Provider } from '@nestjs/common';
import type { ClientOptions } from 'nacos';
import { NACOS_CONFIG_OPTIONS, NACOS_NAMING_OPTIONS } from './nacos.constants';

export const createNacosNamingClientProvider = function (
  options?: ClientOptions,
): Provider {
  return {
    provide: NACOS_NAMING_OPTIONS,
    useValue: options,
  };
};

export const createNacosNamingClientProviderAsync = function (): Provider {
  return {
    provide: '',
    useClass: Object,
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

export const createNacosConfigClientProviderAsync = function (
  options?: ClientOptions & Provider,
): Provider {
  return {
    provide: '',
    useClass: Object,
  };
};
