import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ödeme',
  description: 'Siparişinizi güvenle tamamlayın.',
  robots: { index: false, follow: false },
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
