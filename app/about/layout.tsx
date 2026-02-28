import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Ter-a Seramik',
  description: 'Learn about Ter-a Seramik, our mission, and our commitment to handmade ceramic excellence.',
  keywords: 'about, company, ceramic artisan, handmade',
  openGraph: {
    title: 'About Ter-a Seramik',
    description: 'Learn our story and passion for ceramics',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
