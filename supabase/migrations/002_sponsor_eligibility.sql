
-- Migration 002: Sponsor eligibility fields
-- Additive changes only; preserve existing records.

ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS zip_code text;

ALTER TABLE public.sponsors
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'PENDING'
CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED'));

ALTER TABLE public.sponsors
ADD COLUMN IF NOT EXISTS start_date date;

ALTER TABLE public.sponsors
ADD COLUMN IF NOT EXISTS end_date date;

ALTER TABLE public.sponsors
ADD COLUMN IF NOT EXISTS zip_code text;

ALTER TABLE public.sponsors
ADD COLUMN IF NOT EXISTS radius_miles numeric(8,2);

ALTER TABLE public.sponsors
ADD COLUMN IF NOT EXISTS tier text
CHECK (tier IN ('SILVER', 'GOLD', 'PLATINUM'));

ALTER TABLE public.sponsors
ADD COLUMN IF NOT EXISTS impressions integer NOT NULL DEFAULT 0
CHECK (impressions >= 0);

ALTER TABLE public.property_sponsors
ADD COLUMN IF NOT EXISTS distance_miles numeric(8,2)
CHECK (distance_miles IS NULL OR distance_miles >= 0);
