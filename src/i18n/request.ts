// src/i18n/request.ts
import {getRequestConfig} from 'next-intl/server';

type Locale = 'fr' | 'en' | 'de';

export default getRequestConfig(async ({locale}) => {
  const supported: Locale[] = ['fr', 'en', 'de'];
  const safeLocale: Locale =
    supported.includes(locale as Locale) ? (locale as Locale) : 'fr';

  const messages = (await import(`../messages/${safeLocale}.json`)).default;

  return {
    // ← Ajoute 'locale' pour satisfaire le type RequestConfig
    locale: safeLocale,
    messages
  };
});
