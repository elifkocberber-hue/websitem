import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products | Ter-a Seramik',
  description: 'Shop our wide range of ceramic products and home accessories. High-quality handmade items.',
  keywords: 'pottery products, ceramic items, home accessories',
  openGraph: {
    title: 'Products | Ter-a Seramik',
    description: 'Shop our ceramic products collection',
    type: 'website',
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
