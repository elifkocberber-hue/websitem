import { CeramicProduct } from '@/types/ceramic';
import ceramicData from './ceramics.json';

// Yerel veri (fallback)
export const ceramicProducts: CeramicProduct[] = ceramicData as CeramicProduct[];

// Supabase'den ürünleri çek (varsa), yoksa yerel veriye düş
export async function fetchProducts(): Promise<CeramicProduct[]> {
  try {
    const baseUrl = typeof window !== 'undefined' 
      ? '' 
      : (process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const res = await fetch(`${baseUrl}/api/products`, { 
      next: { revalidate: 60 }, // 60 saniye cache
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) return data as CeramicProduct[];
    }
  } catch {
    // Supabase erişilemezse yerel veriye düş
  }
  return ceramicProducts;
}

export const getCeramicProductById = (id: number | string): CeramicProduct | undefined => {
  return ceramicProducts.find(product => String(product.id) === String(id));
};

// Supabase'den tek ürün çek — HTTP olmadan, doğrudan sorgu
export async function fetchProductById(id: string): Promise<CeramicProduct | undefined> {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) return getCeramicProductById(id);

    const client = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await client
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return getCeramicProductById(id);

    const p = data as Record<string, unknown>;
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      clayType: p.clay_type,
      category: p.category,
      handmade: p.handmade,
      glaze: p.glaze,
      dimensions: (p.dimensions as Record<string, number>) || {},
      weight: p.weight,
      dishwasherSafe: p.dishwasher_safe,
      microwave: p.microwave,
      images: (p.images as string[]) || [],
      featured: p.featured,
    } as CeramicProduct;
  } catch {
    return getCeramicProductById(id);
  }
}

export const getCeramicProductsByCategory = (category: string): CeramicProduct[] => {
  return ceramicProducts.filter(product => product.category === category);
};

export const getCeramicProductsByClayType = (clayType: CeramicProduct['clayType']): CeramicProduct[] => {
  return ceramicProducts.filter(product => product.clayType === clayType);
};

export const getHandmadeCeramics = (): CeramicProduct[] => {
  return ceramicProducts.filter(product => product.handmade);
};

export const getCeramicCategories = (): string[] => {
  return Array.from(new Set(ceramicProducts.map(product => product.category)));
};

export const getClayTypes = (): CeramicProduct['clayType'][] => {
  return Array.from(new Set(ceramicProducts.map(product => product.clayType))) as CeramicProduct['clayType'][];
};
