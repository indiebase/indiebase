import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'zh'];

export default getRequestConfig(async ({ locale }) => {
  console.log(locale);
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./locales/${locale}.ts`)).default,
  };
}) as any;
