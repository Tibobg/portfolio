// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

// Si ton fichier est dans src/i18n/request.ts, tu peux préciser le chemin :
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // garde tes autres options ici (experimental, images, etc.)
};

export default withNextIntl(nextConfig);
