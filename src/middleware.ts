import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Langue par défaut (fallback)
  defaultLocale: 'fr',
  // Langues supportées
  locales: ['fr', 'en', 'de'],
  localeDetection: true,
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
