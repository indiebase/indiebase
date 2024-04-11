import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'zh'] as const;

export type SupportLocales = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as SupportLocales)) notFound();

  return {
    messages: (await import(`./locales/${locale}.ts`)).default,
  };
}) as any;
