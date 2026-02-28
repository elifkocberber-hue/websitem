import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/private/', '/search', '/checkout/'],
      crawlDelay: 1,
    },
    sitemap: 'https://elsdreamfactory.com/sitemap.xml',
  };
}
