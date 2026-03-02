'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

function getSessionId() {
  if (typeof window === 'undefined') return '';
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
}

export function VisitorTracker() {
  const pathname = usePathname();
  const lastTracked = useRef('');
  const pageEntryTime = useRef<number>(0);
  const currentVisitorId = useRef<string | null>(null);

  // Süreyi gönder (sayfa değişimi veya sekme kapanışı)
  const sendDuration = useCallback(() => {
    if (!currentVisitorId.current || !pageEntryTime.current) return;
    const duration = Math.round((Date.now() - pageEntryTime.current) / 1000);
    if (duration < 1 || duration > 7200) return; // 1sn-2saat arası geçerli

    // sendBeacon güvenilir: sekme kapansa bile veri gönderilir
    const payload = JSON.stringify({
      visitorId: currentVisitorId.current,
      duration,
    });
    navigator.sendBeacon('/api/analytics/track', payload);
    currentVisitorId.current = null;
    pageEntryTime.current = 0;
  }, []);

  // Sekme kapanırken süreyi gönder
  useEffect(() => {
    const handleBeforeUnload = () => sendDuration();
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sendDuration();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sendDuration]);

  useEffect(() => {
    // Admin sayfalarını takip etme
    if (pathname.startsWith('/admin')) return;
    // Aynı sayfayı tekrar takip etme
    if (lastTracked.current === pathname) return;

    // Önceki sayfanın süresini gönder
    sendDuration();

    lastTracked.current = pathname;
    pageEntryTime.current = Date.now();

    const trackVisit = async () => {
      try {
        const res = await fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname,
            referrer: document.referrer || null,
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            language: navigator.language,
            sessionId: getSessionId(),
          }),
        });
        const data = await res.json();
        if (data.visitorId) {
          currentVisitorId.current = data.visitorId;
        }
      } catch {
        // Sessizce başarısızlık
      }
    };

    trackVisit();
  }, [pathname, sendDuration]);

  return null;
}
