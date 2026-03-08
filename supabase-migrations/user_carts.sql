-- user_carts tablosu
-- Supabase SQL Editor'da çalıştır

CREATE TABLE IF NOT EXISTS user_carts (
  user_id    text        NOT NULL,
  product_id text        NOT NULL,
  quantity   integer     NOT NULL CHECK (quantity > 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, product_id)
);

-- Sadece kendi satırlarını okuyabilsin (Row Level Security)
ALTER TABLE user_carts ENABLE ROW LEVEL SECURITY;

-- Anon key ile API çağrısı yapıldığı için tam erişim (API route sunucu tarafında çalışır)
CREATE POLICY "service_full_access" ON user_carts
  FOR ALL USING (true) WITH CHECK (true);
