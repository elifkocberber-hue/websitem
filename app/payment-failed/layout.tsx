import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ödeme Başarısız',
  description: 'Ödeme işlemi tamamlanamadı. Lütfen tekrar deneyin.',
  robots: { index: false, follow: false },
};

export default function PaymentFailedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
