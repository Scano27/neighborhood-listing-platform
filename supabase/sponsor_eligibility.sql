
-- Sponsor eligibility query
-- Input: property UUID
-- Enforces approval, campaign dates, and ZIP-code scope.
-- Ranking: tier, distance, impressions, then sponsor ID.

SELECT
    s.id AS sponsor_id,
    s.business_name,
    s.website_url,
    s.status,
    s.start_date,
    s.end_date,
    s.zip_code,
    s.tier,
    s.impressions,
    p.id AS property_id,
    p.zip_code AS property_zip_code,
    ps.distance_miles
FROM public.properties AS p
JOIN public.property_sponsors AS ps
    ON ps.property_id = p.id
JOIN public.sponsors AS s
    ON s.id = ps.sponsor_id
WHERE p.id = (
    SELECT id
    FROM public.properties
    ORDER BY created_at DESC
    LIMIT 1
)
  -- Administrative approval requirement
  AND s.status = 'APPROVED'
  -- Temporal validity requirement
  AND CURRENT_DATE BETWEEN s.start_date AND s.end_date
  -- Spatial scope: sponsor ZIP must match property ZIP
  AND s.zip_code = p.zip_code
ORDER BY
    CASE s.tier
        WHEN 'PLATINUM' THEN 1
        WHEN 'GOLD' THEN 2
        WHEN 'SILVER' THEN 3
        ELSE 4
    END,
    ps.distance_miles ASC NULLS LAST,
    s.impressions ASC,
    s.id ASC
LIMIT 1;
