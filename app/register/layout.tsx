import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Üye Ol',
  description: 'El\'s Dream Factory\'ye üye olun. El yapımı seramik ürünleri kolayca sipariş edin.',
  robots: { index: false },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
