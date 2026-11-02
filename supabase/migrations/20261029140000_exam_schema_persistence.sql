
-- Part 3: Exam relational schema persistence migration
-- Project: Neighborhood Listing Platform

BEGIN;

-- 1. PROFILES
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'public';

ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_role_exam_check;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_role_exam_check
CHECK (role IN ('admin', 'property_owner', 'sponsor', 'public'));

-- Create property-owner profiles for existing property owners.
INSERT INTO public.profiles (id, role)
SELECT DISTINCT owner_id, 'property_owner'
FROM public.properties
ON CONFLICT (id) DO NOTHING;

UPDATE public.profiles
SET role = CASE
    WHEN is_admin = true THEN 'admin'
    ELSE 'property_owner'
END
WHERE id IN (SELECT DISTINCT owner_id FROM public.properties);

ALTER TABLE public.profiles
ALTER COLUMN created_at SET DEFAULT timezone('utc'::text, now());


-- 2. SPONSORS
ALTER TABLE public.sponsors
ADD COLUMN IF NOT EXISTS name TEXT;

ALTER TABLE public.sponsors
ADD COLUMN IF NOT EXISTS active_status BOOLEAN NOT NULL DEFAULT true;

-- Convert existing sponsor data to the exam's required values.
UPDATE public.sponsors
SET name = business_name
WHERE name IS NULL;

UPDATE public.sponsors
SET active_status = is_active
WHERE is_active IS NOT NULL;

ALTER TABLE public.sponsors
DROP CONSTRAINT IF EXISTS sponsors_tier_check;

ALTER TABLE public.sponsors
DROP CONSTRAINT IF EXISTS sponsors_tier_exam_check;

-- Map legacy sponsor tiers to the exam's allowed values.
-- PLATINUM is mapped to gold; missing tiers become bronze.
UPDATE public.sponsors
SET tier = CASE
    WHEN lower(coalesce(tier, '')) = 'silver' THEN 'silver'
    WHEN lower(coalesce(tier, '')) = 'bronze' THEN 'bronze'
    ELSE 'gold'
END;

ALTER TABLE public.sponsors
ALTER COLUMN tier SET DEFAULT 'bronze';

ALTER TABLE public.sponsors
ALTER COLUMN tier SET NOT NULL;

ALTER TABLE public.sponsors
ALTER COLUMN name SET NOT NULL;

ALTER TABLE public.sponsors
ADD CONSTRAINT sponsors_name_exam_check
CHECK (char_length(name) >= 2);

ALTER TABLE public.sponsors
ADD CONSTRAINT sponsors_tier_exam_check
CHECK (tier IN ('gold', 'silver', 'bronze'));

ALTER TABLE public.sponsors
ALTER COLUMN created_at SET DEFAULT timezone('utc'::text, now());


-- 3. PROPERTIES
ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS bedrooms INTEGER;

ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS bathrooms NUMERIC(3,1);

ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS square_feet INTEGER;

ALTER TABLE public.properties
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft';

-- Remove the old test listing because its required measurements are unknown.
-- Related property_sponsors and inquiries rows are removed by cascading foreign keys.
DELETE FROM public.properties
WHERE bedrooms IS NULL
   OR bathrooms IS NULL
   OR square_feet IS NULL;

UPDATE public.properties
SET status = CASE
    WHEN is_approved = true THEN 'approved'
    ELSE 'draft'
END;

ALTER TABLE public.properties
ALTER COLUMN bedrooms SET NOT NULL;

ALTER TABLE public.properties
ALTER COLUMN bathrooms SET NOT NULL;

ALTER TABLE public.properties
ALTER COLUMN square_feet SET NOT NULL;

ALTER TABLE public.properties
ADD CONSTRAINT properties_status_exam_check
CHECK (status IN ('draft', 'pending', 'approved', 'rejected'));

ALTER TABLE public.properties
ADD CONSTRAINT properties_bedrooms_exam_check
CHECK (bedrooms >= 0);

ALTER TABLE public.properties
ADD CONSTRAINT properties_bathrooms_exam_check
CHECK (bathrooms >= 0);

ALTER TABLE public.properties
ADD CONSTRAINT properties_square_feet_exam_check
CHECK (square_feet > 0);

ALTER TABLE public.properties
DROP CONSTRAINT IF EXISTS properties_owner_id_fkey;

ALTER TABLE public.properties
ADD CONSTRAINT properties_owner_profile_exam_fkey
FOREIGN KEY (owner_id)
REFERENCES public.profiles(id)
ON DELETE RESTRICT;

ALTER TABLE public.properties
ALTER COLUMN created_at SET DEFAULT timezone('utc'::text, now());


-- 4. PROPERTY_SPONSORS
-- Existing composite primary key and cascading foreign keys are retained.


-- 5. INQUIRIES
ALTER TABLE public.inquiries
ADD COLUMN IF NOT EXISTS inquirer_email TEXT;

ALTER TABLE public.inquiries
ALTER COLUMN inquirer_email SET NOT NULL;

ALTER TABLE public.inquiries
ADD CONSTRAINT inquiries_email_exam_check
CHECK (
    inquirer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

ALTER TABLE public.inquiries
ADD CONSTRAINT inquiries_message_exam_check
CHECK (char_length(message) >= 10);

ALTER TABLE public.inquiries
ALTER COLUMN created_at SET DEFAULT timezone('utc'::text, now());

COMMIT;