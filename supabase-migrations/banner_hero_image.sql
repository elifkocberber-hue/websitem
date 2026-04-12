-- banner_settings tablosuna hero_image kolonu ekle
ALTER TABLE banner_settings
ADD COLUMN IF NOT EXISTS hero_image TEXT NOT NULL DEFAULT '/images/arkaplan.jpg';
