'use client';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getI18nOptions } from './settings';
import { kDevMode } from '@deskbtm/gadgets/env';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language: string, namespace: string) => {
      console.log(language, namespace);
      return import(`./locales/${language}/${namespace}.json`);
    }),
  )
  .init({
    debug: kDevMode,
    supportedLngs: ['en', 'zh', 'de'],
    fallbackLng: ['en'],
    defaultNS: ['translation'],
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      lookupQuerystring: 'lang',
    },
  });
