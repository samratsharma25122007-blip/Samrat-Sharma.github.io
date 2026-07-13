import type { MetadataRoute } from 'next';

import { SITE } from '@/config/site';

// Static export: emit a fixed sitemap.xml at build time.
export const dynamic = 'force-static';

/**
 * Sitemap (PRD Part 12). Single-page experience, but the sitemap declares the
 * canonical entry point for crawlers. `lastModified` uses build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/technology/', '/water-purification/', '/service/', '/about/', '/contact/'];
  return routes.map((route) => ({
    url: `${SITE.domain}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
