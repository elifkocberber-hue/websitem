import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | Ter-a Seramik',
  description: 'Review your items and proceed to checkout.',
  robots: {
    index: false, // Don't index cart page
  },
  openGraph: {
    title: 'Shopping Cart',
    description: 'Your shopping cart at Ter-a Seramik',
    type: 'website',
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
