import Image from 'next/image';
import Link from 'next/link';
import { ceramicProducts } from '@/data/ceramicProducts';
import { CeramicProductCard } from '@/components/CeramicProductCard';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative -mx-4 mb-16">
        <div className="relative h-[600px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1920&q=80"
            alt="El yapımı seramik ürünleri"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 to-stone-900/40" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-xl">
                <p className="text-amber-400 font-medium tracking-widest uppercase text-sm mb-4">
                  El Yapımı Seramik Sanatı
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Topraktan<br />Sanata
                </h1>
                <p className="text-lg text-stone-200 mb-8 leading-relaxed">
                  Her parça, ustalarımızın ellerinde şekillenen benzersiz bir hikaye taşır.
                  Geleneksel Kütahya seramik sanatını modern tasarımlarla buluşturuyoruz.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/ceramics"
                    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                  >
                    Koleksiyonu Keşfet
                  </Link>
                  <Link
                    href="/about"
                    className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
                  >
                    Hikayemiz
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">30+</p>
            <p className="text-sm text-gray-500 mt-1">Yıllık Deneyim</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">500+</p>
            <p className="text-sm text-gray-500 mt-1">Mutlu Müşteri</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">400+</p>
            <p className="text-sm text-gray-500 mt-1">Benzersiz Tasarım</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-600">%100</p>
            <p className="text-sm text-gray-500 mt-1">El Yapımı</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-amber-600 font-medium text-sm uppercase tracking-wider mb-2">Koleksiyon</p>
            <h2 className="text-3xl font-bold text-gray-900">Öne Çıkan Ürünler</h2>
          </div>
          <Link href="/ceramics" className="text-amber-600 hover:text-amber-700 font-medium hidden md:block">
            Tümünü Gör &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ceramicProducts.slice(0, 4).map(product => (
            <CeramicProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8 md:hidden">
          <Link
            href="/ceramics"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Tüm Ürünleri Gör
          </Link>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80"
              alt="Seramik atölyesi"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-amber-600 font-medium text-sm uppercase tracking-wider mb-2">Hakkımızda</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Üç Kuşağın Mirası</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              1994 yılında Kütahya'da kurulan atölyemiz, üç kuşaklık seramik üretim geleneğini sürdürmektedir.
              Her ürünümüz, geleneksel tekniklerin modern yorumuyla hayat bulur.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Doğal malzemeler ve ustalarımızın deneyimi ile her parça benzersiz bir sanat eserine dönüşür.
            </p>
            <Link
              href="/about"
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              Daha Fazla Bilgi &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="mb-16 bg-stone-50 -mx-4 px-4 py-16 md:rounded-2xl md:mx-0 md:px-12">
        <div className="text-center mb-12">
          <p className="text-amber-600 font-medium text-sm uppercase tracking-wider mb-2">Sürecimiz</p>
          <h2 className="text-3xl font-bold text-gray-900">Nasıl Yapılır?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-700 font-bold text-xl">01</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Çamur Hazırlığı</h3>
            <p className="text-gray-500 text-sm">En kaliteli doğal toprakların özenle seçimi ve hazırlanması</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-700 font-bold text-xl">02</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Şekillendirme</h3>
            <p className="text-gray-500 text-sm">Ustalarımızın ellerinde her parça benzersiz formunu alır</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-700 font-bold text-xl">03</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Fırınlama</h3>
            <p className="text-gray-500 text-sm">Yüksek sıcaklıkta kontrollü pişirme ile dayanıklılık kazanır</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-700 font-bold text-xl">04</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Cilalama</h3>
            <p className="text-gray-500 text-sm">Son dokunuşlarla mükemmel yüzey kalitesi elde edilir</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-16 relative rounded-2xl overflow-hidden">
        <div className="relative h-[300px]">
          <Image
            src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1920&q=80"
            alt="Seramik koleksiyonu"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/70" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Evinize Sanat Katın
              </h2>
              <p className="text-stone-300 mb-8 max-w-lg mx-auto">
                Her biri el yapımı, benzersiz seramik ürünlerimizle yaşam alanlarınızı güzelleştirin.
              </p>
              <Link
                href="/ceramics"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Alışverişe Başla
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mb-12 bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Yeni Koleksiyonlardan Haberdar Olun</h2>
          <p className="text-gray-500 mb-6">
            Yeni tasarımlar, özel indirimler ve atölye haberlerimiz için abone olun.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
              Abone Ol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
