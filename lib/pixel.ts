declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export const hasMarketingConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const prefs = localStorage.getItem('cookie_preferences');
    if (prefs) return JSON.parse(prefs).marketing === true;
    return localStorage.getItem('cookie_consent') === 'accepted';
  } catch {
    return false;
  }
};

export const trackAddToCart = (product: {
  id: number | string;
  name: string;
  price: number;
}, quantity: number): void => {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  if (!hasMarketingConsent()) return;

  window.fbq('track', 'AddToCart', {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_type: 'product',
    value: product.price * quantity,
    currency: 'TRY',
    num_items: quantity,
  });
};
