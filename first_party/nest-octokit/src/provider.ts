import { Provider } from '@nestjs/common';
import { OCTOKIT_OPTIONS } from './octokit.constants';
import { OctokitAsyncOptions, OctokitOptions } from './octokit.interface';

export const createOctokitProvider = function (
  options?: OctokitOptions,
): Provider {
  return {
    provide: OCTOKIT_OPTIONS,
    useValue: options,
  };
};

export const createOctokitProviderAsync = function (
  options?: OctokitAsyncOptions,
): Provider {
  return {
    provide: OCTOKIT_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject,
  };
};
