import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Siparişiniz Alındı',
  description: 'Teşekkürler! Siparişiniz başarıyla alındı.',
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
