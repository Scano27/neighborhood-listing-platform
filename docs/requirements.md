# Product Requirements: Sponsor-Backed Property Listing & Inquiry Subsystem

## Story 1 — Property Owner
As a registered property owner, I want to submit listing drafts so that prospective buyers can review them once verified by administrative staff.

- **Given:** An authenticated property owner.
- **When:** The owner submits a valid listing payload.
- **Then:** The property is saved with `status = 'draft'` and `owner_id = auth.uid()`.
- **Scope estimate:** Medium
- **Traceability (planned implementation):** `supabase/migrations/20261029140000_exam_schema_persistence.sql`; `src/app/api/properties/route.ts` POST handler.

## Story 2 — Public Inquirer
As a prospective neighborhood resident, I want to view approved properties alongside their tier-level sponsors and submit an inquiry without seeing prior inquiries from other users.

- **Given:** An anonymous visitor.
- **When:** The visitor queries public listings.
- **Then:** Only properties with `status = 'approved'` and active sponsors are returned.
- **Given:** An anonymous visitor with a valid inquiry.
- **When:** The visitor submits the inquiry.
- **Then:** The inquiry is inserted, but the visitor cannot read existing inquiries.
- **Scope estimate:** Large
- **Traceability (planned implementation):** `supabase/migrations/20261029140000_exam_schema_persistence.sql`; `src/app/api/properties/route.ts` GET/POST handlers and inquiry RLS policies.

## Story 3 — Platform Administrator
As an authorized platform administrator, I want controlled administrative access to records across the subsystem so that I can conduct compliance audits and approved maintenance.

- **Given:** An authorized platform administrator using an approved administrative execution context.
- **When:** The administrator performs an authorized audit or maintenance operation.
- **Then:** The operation can access and modify records across the subsystem, with access appropriately restricted to the administrative context.
- **Scope estimate:** Large
- **Traceability (planned implementation):** `supabase/migrations/20261029140000_exam_schema_persistence.sql`; administrator RLS policies and server-side administrative execution.

## Acceptance and Verification
- Verify owner inserts create drafts associated with the authenticated owner.
- Verify anonymous listing reads exclude drafts and rejected listings.
- Verify inactive sponsors are not returned publicly.
- Verify inquiry insertion works but inquiry reads are restricted to administrators and the associated property owner.
- Verify cross-owner listing updates are denied.
- Record actual test results in `docs/security-audit.md`. Do not mark a test as passed until it has been run.
