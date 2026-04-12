import { fetchProducts } from '@/data/ceramicProducts';
import { supabase } from '@/lib/supabase';
import HomeClient from './HomeClient';

const DEFAULT_BANNER = {
  items: ['Ceramic', 'Illustration', 'Gift', 'Handmade', 'Unique'] as string[],
  campaign_active: false,
  campaign_text: '',
};

async function fetchBannerSettings() {
  try {
    const { data } = await supabase
      .from('banner_settings')
      .select('items, campaign_active, campaign_text')
      .eq('id', 1)
      .single();
    return data ?? DEFAULT_BANNER;
  } catch {
    return DEFAULT_BANNER;
  }
}

export default async function Home() {
  const [allProducts, banner] = await Promise.all([fetchProducts(), fetchBannerSettings()]);
  const featured = allProducts.slice(0, 4);

  return <HomeClient featured={featured} banner={banner} />;
}
