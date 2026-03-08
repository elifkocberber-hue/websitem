import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

// GET /api/user/cart?userId=xxx — kullanıcının sepetini getir
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  if (!userId) return NextResponse.json({ error: 'userId gerekli' }, { status: 400 });

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('user_carts')
      .select('product_id, quantity')
      .eq('user_id', userId);

    if (error) {
      console.error('Supabase cart GET error:', error);
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json({ items: data ?? [] });
  } catch (e) {
    console.error('Cart GET error:', e);
    return NextResponse.json({ items: [] });
  }
}

// POST /api/user/cart — sepeti Supabase'e kaydet (tam üzerine yazar)
export async function POST(request: NextRequest) {
  try {
    const { userId, items } = await request.json() as {
      userId: string;
      items: { product_id: string; quantity: number }[];
    };

    if (!userId) return NextResponse.json({ error: 'userId gerekli' }, { status: 400 });

    const supabase = getSupabase();

    // Önce kullanıcının mevcut sepetini sil
    const { error: deleteError } = await supabase
      .from('user_carts')
      .delete()
      .eq('user_id', userId);

    if (deleteError) {
      console.error('Cart delete error:', deleteError);
      return NextResponse.json({ error: 'Sepet güncellenemedi' }, { status: 500 });
    }

    // Yeni items varsa ekle
    if (items.length > 0) {
      const rows = items.map(i => ({
        user_id: userId,
        product_id: i.product_id,
        quantity: i.quantity,
        updated_at: new Date().toISOString(),
      }));

      const { error: insertError } = await supabase.from('user_carts').insert(rows);
      if (insertError) {
        console.error('Cart insert error:', insertError);
        return NextResponse.json({ error: 'Sepet kaydedilemedi' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Cart POST error:', e);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
