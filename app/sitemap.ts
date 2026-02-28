import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const baseUrl = 'https://elsdreamfactory.com';

  // Ana sayfalar
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/ceramics', priority: 0.9, changefreq: 'daily' },
    { url: '/payment', priority: 0.7, changefreq: 'weekly' },
    { url: '/cart', priority: 0.6, changefreq: 'hourly' },
  ];

  // Ürün sayfaları (dinamik olarak eksilebilir)
  const products = [
    { id: '1', name: 'Ceramic Vase' },
    { id: '2', name: 'Ceramic Pot' },
    { id: '3', name: 'Ceramic Plate' },
  ];

  const ceramics = [
    { id: '1', name: 'Traditional Ceramics' },
    { id: '2', name: 'Modern Ceramics' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `
    )
    .join('')}

  ${ceramics
    .map(
      (ceramic) => `
  <url>
    <loc>${baseUrl}/ceramic/${ceramic.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `
    )
    .join('')}

  ${products
    .map(
      (product) => `
  <url>
    <loc>${baseUrl}/product/${product.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  `
    )
    .join('')}

</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
    },
  });
}
