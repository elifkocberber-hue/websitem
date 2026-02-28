import { NextResponse } from 'next/server';

export function GET() {
  const robots = `# Robots.txt for Ter-a Seramik
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /private/
Disallow: /*.json$
Disallow: /search
Disallow: /checkout/

# Crawl delay
Crawl-delay: 1

# Sitemaps
Sitemap: https://elsdreamfactory.com/sitemap.xml
Sitemap: https://elsdreamfactory.com/sitemap-products.xml
Sitemap: https://elsdreamfactory.com/sitemap-ceramics.xml

# Specific user agents
User-agent: Googlebot
Allow: /
Crawl-delay: 0

User-agent: Bingbot
Allow: /
Crawl-delay: 1
`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
