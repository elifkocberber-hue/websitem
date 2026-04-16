'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import Link from 'next/link';

interface HomepageSettings {
  hero_subtitle: string;
  hero_title: string;
  hero_desc: string;
  collection_label: string;
  featured_title: string;
  philosophy_label: string;
  philosophy_title: string;
  philosophy_desc: string;
  pillar1_title: string;
  pillar1_desc: string;
  pillar2_title: string;
  pillar2_desc: string;
  pillar3_title: string;
  pillar3_desc: string;
  cta_title: string;
  cta_btn: string;
  newsletter_title: string;
  newsletter_desc: string;
}

const DEFAULT: HomepageSettings = {
  hero_subtitle: 'El Yapımı Seramik Ürünler & Hediyeler',
  hero_title: 'Fırından Yeni Çıkan\nMutluluklar',
  hero_desc: 'Doğanın toprağından, ustalarımızın elleriyle şekillenen; evinize anlam ve güzellik katan eserler.',
  collection_label: 'Koleksiyon',
  featured_title: 'Öne Çıkan Eserler',
  philosophy_label: 'Felsefemiz',
  philosophy_title: 'Wabi-Sabi',
  philosophy_desc: 'Kusursuzlukta güzellik aramıyoruz. Her çatlak, her doku, her asimetri — tabiatın ve insan elinin imzası.',
  pillar1_title: 'Geleneksel Zanaat',
  pillar1_desc: 'Yüzyıllık teknikleri modern formlarla buluşturuyoruz.',
  pillar2_title: 'Doğal Malzeme',
  pillar2_desc: 'En kaliteli topraklar ve organik cilalarla üretiyoruz.',
  pillar3_title: 'Benzersiz Tasarım',
  pillar3_desc: 'Her parça tek ve tekrarlanamaz bir sanat eseridir.',
  cta_title: 'Evinize Sanat Katın',
  cta_btn: 'Alışverişe Başla',
  newsletter_title: 'Haberdar Olun',
  newsletter_desc: 'Yeni koleksiyonlar, özel teklifler ve atölyeden haberler.',
};

function Field({
  id,
  label,
  value,
  onChange,
  multiline = false,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#DD6B56] resize-y"
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#DD6B56]"
        />
      )}
    </div>
  );
}

export default function AdminHomepagePage() {
  const { isAuthenticated, loading: authLoading } = useAdmin();
  const router = useRouter();

  const [settings, setSettings] = useState<HomepageSettings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/sergenim/login');
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/admin/homepage')
        .then((r) => r.json())
        .then((d) => setSettings({ ...DEFAULT, ...d }))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated]);

  const set = (key: keyof HomepageSettings) => (value: string) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/homepage', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Kaydedildi!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Bir hata oluştu' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Bağlantı hatası' });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">🏠 Anasayfa Metin Yönetimi</h1>
            <p className="text-gray-500 text-sm mt-1">Anasayfadaki tüm metin alanlarını düzenleyin</p>
          </div>
          <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-gray-900 underline">
            ← Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : (
          <>
            {/* ── Hero ── */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Hero Bölümü</h2>
              <Field id="hero_subtitle" label="Alt başlık" value={settings.hero_subtitle} onChange={set('hero_subtitle')} hint='Örn: "El Yapımı Seramik Ürünler & Hediyeler"' />
              <Field id="hero_title" label="Ana başlık" value={settings.hero_title} onChange={set('hero_title')} multiline hint='Satır kesmek için Enter kullanın.' />
              <Field id="hero_desc" label="Açıklama metni" value={settings.hero_desc} onChange={set('hero_desc')} multiline />
            </div>

            {/* ── Öne Çıkan Ürünler ── */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Öne Çıkan Ürünler Bölümü</h2>
              <Field id="collection_label" label="Bölüm etiketi" value={settings.collection_label} onChange={set('collection_label')} hint='Örn: "Koleksiyon"' />
              <Field id="featured_title" label="Başlık" value={settings.featured_title} onChange={set('featured_title')} hint='Örn: "Öne Çıkan Eserler"' />
            </div>

            {/* ── Felsefe ── */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Felsefe Bölümü</h2>
              <Field id="philosophy_label" label="Bölüm etiketi" value={settings.philosophy_label} onChange={set('philosophy_label')} hint='Örn: "Felsefemiz"' />
              <Field id="philosophy_title" label="Başlık" value={settings.philosophy_title} onChange={set('philosophy_title')} hint='Örn: "Wabi-Sabi"' />
              <Field id="philosophy_desc" label="Açıklama" value={settings.philosophy_desc} onChange={set('philosophy_desc')} multiline />

              <div className="pt-2 space-y-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">3 Sütun</p>
                {([1, 2, 3] as const).map((n) => (
                  <div key={n} className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <Field
                      id={`pillar${n}_title`}
                      label={`${n}. Sütun Başlığı`}
                      value={settings[`pillar${n}_title`]}
                      onChange={set(`pillar${n}_title`)}
                    />
                    <Field
                      id={`pillar${n}_desc`}
                      label={`${n}. Sütun Açıklaması`}
                      value={settings[`pillar${n}_desc`]}
                      onChange={set(`pillar${n}_desc`)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">CTA Bölümü</h2>
              <Field id="cta_title" label="Başlık" value={settings.cta_title} onChange={set('cta_title')} hint='Örn: "Evinize Sanat Katın"' />
              <Field id="cta_btn" label="Buton metni" value={settings.cta_btn} onChange={set('cta_btn')} hint='Örn: "Alışverişe Başla"' />
            </div>

            {/* ── Newsletter ── */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Bülten Bölümü</h2>
              <Field id="newsletter_title" label="Başlık" value={settings.newsletter_title} onChange={set('newsletter_title')} hint='Örn: "Haberdar Olun"' />
              <Field id="newsletter_desc" label="Açıklama" value={settings.newsletter_desc} onChange={set('newsletter_desc')} multiline />
            </div>

            {/* ── Kaydet ── */}
            <div className="flex items-center gap-4 pb-8">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="bg-[#DD6B56] hover:bg-[#C45540] disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-lg transition"
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              {message && (
                <span className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {message.text}
                </span>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
