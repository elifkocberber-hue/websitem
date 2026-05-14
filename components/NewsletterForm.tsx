'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const NewsletterForm: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !kvkkAccepted) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), kvkkConsent: true }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
      <div className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.newsletter.placeholder}
          required
          className="flex-1 px-5 py-3 bg-transparent border border-charcoal/20 text-sm text-charcoal placeholder:text-clay focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading' || !kvkkAccepted}
          className="bg-charcoal text-bone px-6 py-3 text-sm tracking-wider uppercase hover:bg-accent transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? '...' : status === 'success' ? '✓' : t.newsletter.subscribe}
        </button>
      </div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={kvkkAccepted}
          onChange={(e) => setKvkkAccepted(e.target.checked)}
          required
          className="mt-0.5 w-3.5 h-3.5 shrink-0 accent-charcoal"
        />
        <span className="text-[11px] text-clay/70 leading-relaxed">
          Kampanya ve yeni koleksiyon bilgilendirmelerini almak için{' '}
          <a href="/privacy" className="underline hover:text-charcoal transition-colors">Gizlilik Politikası</a>{' '}
          kapsamında e-posta iletişimine açık rıza veriyorum.
        </span>
      </label>
      {status === 'success' && (
        <p className="text-xs text-green-600">{t.newsletter.success}</p>
      )}
      {status === 'error' && (
        <p className="text-xs text-red-600">{t.newsletter.error}</p>
      )}
    </form>
  );
};
