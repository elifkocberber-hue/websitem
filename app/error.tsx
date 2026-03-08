'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bone flex flex-col items-center justify-center px-6 text-center">
      <h1 className="heading-serif text-4xl text-charcoal mb-4">Bir şeyler ters gitti</h1>
      <p className="text-earth mb-8 max-w-md">
        Beklenmedik bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-charcoal text-bone rounded-full text-sm tracking-wide hover:bg-accent transition-colors"
        >
          Tekrar Dene
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-charcoal text-charcoal rounded-full text-sm tracking-wide hover:bg-charcoal hover:text-bone transition-colors"
        >
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
