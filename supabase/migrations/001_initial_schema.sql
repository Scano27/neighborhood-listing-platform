
-- Migration 001: Initial schema and row-level security
-- Project: Neighborhood Listing Platform
-- Fictional development schema for coursework

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  is_admin boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES auth.users(id),
  title text NOT NULL CHECK (length(trim(title)) > 0),
  address text NOT NULL,
  city text NOT NULL,
  price numeric(12,2) NOT NULL CHECK (price >= 0),
  is_approved boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.sponsors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES auth.users(id),
  business_name text NOT NULL CHECK (length(trim(business_name)) > 0),
  website_url text,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.property_sponsors (
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  sponsor_id uuid NOT NULL REFERENCES public.sponsors(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (property_id, sponsor_id)
);

CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  message text NOT NULL CHECK (length(trim(message)) > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on every table exposed through the API.
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;


-- Explicit table permissions; RLS policies still control which rows are accessible.
GRANT SELECT ON public.profiles TO authenticated;

GRANT SELECT, INSERT, UPDATE
ON public.properties TO authenticated;

GRANT SELECT, INSERT, UPDATE
ON public.sponsors TO authenticated;

GRANT SELECT
ON public.property_sponsors TO authenticated;

GRANT SELECT, INSERT
ON public.inquiries TO authenticated;

-- Anonymous visitors may only read public listings and active sponsors,
-- subject to the applicable RLS policies.
GRANT SELECT ON public.properties TO anon;
GRANT SELECT ON public.sponsors TO anon;
GRANT SELECT ON public.property_sponsors TO anon;


-- Profiles: users can read and update their own profile.
CREATE POLICY "Users read own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id);

-- Users may update their own profile row.
-- Column-level grants must separately prevent client updates to is_admin.
CREATE POLICY "Users update own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Prevent clients from updating profile columns by default.
REVOKE UPDATE ON public.profiles FROM anon, authenticated;

-- Allow authenticated users to update only their display name.
GRANT UPDATE (display_name)
ON public.profiles
TO authenticated;

-- Properties: public users can read approved listings.
CREATE POLICY "Public read approved properties"
ON public.properties FOR SELECT TO anon, authenticated
USING (is_approved = true);

-- Owners can read and update their own unapproved listings.
CREATE POLICY "Owners read own unapproved properties"
ON public.properties FOR SELECT TO authenticated
USING (auth.uid() = owner_id AND is_approved = false);

CREATE POLICY "Owners insert unapproved properties"
ON public.properties FOR INSERT TO authenticated
WITH CHECK (auth.uid() = owner_id AND is_approved = false);

CREATE POLICY "Owners update own unapproved properties"
ON public.properties FOR UPDATE TO authenticated
USING (auth.uid() = owner_id AND is_approved = false)
WITH CHECK (auth.uid() = owner_id AND is_approved = false);

-- Sponsors: public users can read active sponsors.
CREATE POLICY "Public read active sponsors"
ON public.sponsors FOR SELECT TO anon, authenticated
USING (is_active = true);

CREATE POLICY "Owners read own sponsors"
ON public.sponsors FOR SELECT TO authenticated
USING (auth.uid() = owner_id);

CREATE POLICY "Owners insert inactive sponsors"
ON public.sponsors FOR INSERT TO authenticated
WITH CHECK (auth.uid() = owner_id AND is_active = false);

CREATE POLICY "Owners update own inactive sponsors"
ON public.sponsors FOR UPDATE TO authenticated
USING (auth.uid() = owner_id AND is_active = false)
WITH CHECK (auth.uid() = owner_id AND is_active = false);

-- Property-sponsor links: public reads are limited by property and sponsor visibility.
CREATE POLICY "Public read links for approved properties and active sponsors"
ON public.property_sponsors FOR SELECT TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.properties p
    WHERE p.id = property_id AND p.is_approved = true
  )
  AND EXISTS (
    SELECT 1 FROM public.sponsors s
    WHERE s.id = sponsor_id AND s.is_active = true
  )
);

-- Inquiries: authenticated users may submit inquiries for approved properties.
CREATE POLICY "Authenticated users submit inquiries"
ON public.inquiries FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = sender_id
  AND EXISTS (
    SELECT 1 FROM public.properties p
    WHERE p.id = property_id AND p.is_approved = true
  )
);

-- Only the sender can read their own inquiries.
CREATE POLICY "Senders read own inquiries"
ON public.inquiries FOR SELECT TO authenticated
USING (auth.uid() = sender_id);

-- No DELETE policies are defined. No administrator client policy is defined.
-- Administrator operations must use a separately authorized server-side path.
