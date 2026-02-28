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
Sitemap: https://websitemm.vercel.app/sitemap.xml
Sitemap: https://websitemm.vercel.app/sitemap-products.xml
Sitemap: https://websitemm.vercel.app/sitemap-ceramics.xml

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
