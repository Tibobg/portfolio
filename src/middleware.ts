// src/middleware.ts (ou /middleware.ts si ton code n’est pas dans /src)
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en', 'de'],
  defaultLocale: 'fr',
  // "always" => les URLs auront toujours le préfixe /fr, /en, /de
  // "as-needed" => / reste en FR et /en, /de pour les autres
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(fr|en|de)/:path*']
};
