// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// Si ton fichier est dans src/i18n/request.ts, tu peux préciser le chemin :
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
  },
  compress: true,
};

export default withNextIntl(nextConfig);
