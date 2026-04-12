-- Banner / Marquee ayarları tablosu
CREATE TABLE IF NOT EXISTS banner_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  items JSONB NOT NULL DEFAULT '["Ceramic", "Illustration", "Gift", "Handmade", "Unique"]',
  campaign_active BOOLEAN NOT NULL DEFAULT false,
  campaign_text TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Varsayılan satırı ekle (tablo boşsa)
INSERT INTO banner_settings (id, items, campaign_active, campaign_text)
VALUES (1, '["Ceramic", "Illustration", "Gift", "Handmade", "Unique"]', false, '')
ON CONFLICT (id) DO NOTHING;
