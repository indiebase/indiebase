import type { Provider } from '@nestjs/common';
import type { NacosNamingClientOptions, ClientOptions } from 'nacos';
import { NACOS_CONFIG_OPTIONS, NACOS_NAMING_OPTIONS } from './nacos.contants';

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
    useClass: Object,
  };
};

export const createNacosConfigClientProviderAsync = function (): Provider {
  return {
    provide: '',
    useClass: Object,
  };
};
