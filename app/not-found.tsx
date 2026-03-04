import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs tracking-[0.3em] uppercase text-earth mb-4">404</p>
      <h1 className="heading-display text-4xl md:text-5xl text-charcoal mb-4">
        Sayfa Bulunamadı
      </h1>
      <p className="text-earth max-w-md mb-10 leading-relaxed">
        Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-block bg-charcoal text-bone px-8 py-4 text-sm tracking-wider uppercase hover:bg-accent hover:text-bone transition-colors duration-300"
        >
          Ana Sayfaya Dön
        </Link>
        <Link
          href="/ceramics"
          className="inline-block border border-charcoal/30 text-charcoal px-8 py-4 text-sm tracking-wider uppercase hover:border-charcoal hover:bg-charcoal/5 transition-all duration-300"
        >
          Koleksiyonu Keşfet
        </Link>
      </div>
    </div>
  );
}
