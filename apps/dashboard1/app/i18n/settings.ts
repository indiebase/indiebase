import { kDevMode } from '@deskbtm/gadgets/env';
import { InitOptions } from 'i18next';

export const fallbackLng = 'en';
export const supportedLngs = [fallbackLng, 'zh'];
export const defaultNS = 'translation';

export const getI18nOptions = (): InitOptions => {
  return {
    debug: kDevMode,
    supportedLngs,
    fallbackLng,
    defaultNS,
  };
};
