-- orders tablosuna kargo takip numarası sütunu ekle
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS tracking_number TEXT;
