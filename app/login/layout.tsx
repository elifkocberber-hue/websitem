import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giriş Yap',
  description: 'El\'s Dream Factory hesabınıza giriş yapın. Siparişlerinizi takip edin, favorilerinizi yönetin.',
  robots: { index: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
