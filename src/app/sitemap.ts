import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.thibaultcauche.com';
  const paths = ['', '/fr', '/en', '/de'];
  return paths.map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
    priority: p === '' ? 1 : 0.8,
  }));
}