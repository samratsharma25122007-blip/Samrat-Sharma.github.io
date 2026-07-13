import type { MetadataRoute } from 'next';

import { SITE } from '@/config/site';

// Static export: emit a fixed robots.txt at build time.
export const dynamic = 'force-static';

/** robots.txt (PRD Part 12). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE.domain}/sitemap.xml`,
  };
}
