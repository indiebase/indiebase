import { I18nContext } from 'nestjs-i18n';

import { Resource } from './resource.interface';

export enum ConsumerResources {
  admin = 'admin',
}

export const getConsumerResources: (i18n: I18nContext) => Resource[] = (
  i18n,
) => [];
