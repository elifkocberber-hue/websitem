CREATE TABLE IF NOT EXISTS faqs (
  id        BIGSERIAL PRIMARY KEY,
  question  TEXT        NOT NULL,
  answer    TEXT        NOT NULL DEFAULT '',
  status    TEXT        NOT NULL DEFAULT 'pending'
              CHECK (status IN ('pending', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Yayınlanmış SSS'leri herkese açık okutmak için RLS politikası
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published faqs"
  ON faqs FOR SELECT
  USING (status = 'published');

CREATE POLICY "Service role full access"
  ON faqs FOR ALL
  USING (true);
