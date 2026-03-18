-- ============================================================
-- Migration: Kategoriler tablosu + Ürün varyasyonları
-- Supabase SQL Editor'da çalıştırın
-- ============================================================

-- 1. Kategoriler tablosu
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Varsayılan kategorileri ekle (zaten varsa atla)
INSERT INTO categories (name, sort_order) VALUES
  ('Çanak & Kase', 1),
  ('Fincan & Tabak', 2),
  ('Vazolar', 3),
  ('Tabaklar', 4),
  ('Kaplar', 5),
  ('Dekorasyon', 6),
  ('Mutfak', 7),
  ('Pişirme Kapları', 8),
  ('Figürler', 9),
  ('Saksılar', 10)
ON CONFLICT (name) DO NOTHING;

-- RLS (Row Level Security) - herkese okuma, admin API üzerinden yazma
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_public_read" ON categories
  FOR SELECT USING (true);

CREATE POLICY "categories_all_write" ON categories
  FOR ALL USING (true);

-- 2. Ürünlere varyasyonlar kolonu ekle
-- Örnek JSONB yapısı:
-- { "typeName": "Renk", "options": [{ "name": "Mavi", "stock": 5 }, { "name": "Kırmızı", "stock": 3 }] }
ALTER TABLE products ADD COLUMN IF NOT EXISTS variations JSONB DEFAULT NULL;
