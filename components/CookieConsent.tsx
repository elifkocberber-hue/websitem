'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Sayfa yüklendikten kısa süre sonra göster
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[9998] transition-opacity duration-500" />

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 animate-slide-up">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8">
          {/* Başlık */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🍪</span>
            <h3 className="text-lg font-bold text-gray-900">Çerez Kullanımı</h3>
          </div>

          {/* Metin */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            İnternet sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi 
            geliştirebilmek için çerezler (cookie) kullanmaktayız. Çerezlere ilişkin ayarları internet 
            sitemizde yer alan &quot;Çerez Ayarları&quot; seçeneğinden değiştirebileceğiniz gibi ayrıca çerez 
            kullanılmasını tercih etmezseniz tarayıcınızın ayarlarından çerezleri silebilir ya da 
            engelleyebilirsiniz. Ancak bunun internet sitemizi kullanımınızı etkileme ihtimali 
            bulunduğunu hatırlatmak isteriz. Çerezlere ilişkin daha detaylı bilgiye{' '}
            <Link
              href="/cookie-policy"
              className="text-amber-700 hover:text-amber-800 underline underline-offset-2 font-medium"
            >
              Çerez Aydınlatma Metni
            </Link>
            {' '}adlı dokümandan ulaşabilirsiniz.
          </p>

          {/* Butonlar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              className="flex-1 bg-charcoal hover:bg-charcoal/90 text-bone px-6 py-3 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
            >
              Kabul Et
            </button>
            <button
              onClick={handleReject}
              className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg text-sm font-semibold tracking-wide uppercase transition-colors duration-200"
            >
              Reddet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
