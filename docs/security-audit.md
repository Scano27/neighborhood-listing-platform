\# Part 4: Row Level Security (RLS) Security Audit



\## 1. Security Overview



Row Level Security (RLS) is enabled on all five public database tables:



\- `profiles`

\- `properties`

\- `sponsors`

\- `property\_sponsors`

\- `inquiries`



RLS policies restrict database access according to the user's authentication status, ownership, and administrative role.



\## 2. Security Audit Matrix



| User role | Table / action | Allowed access | Restricted access |

|---|---|---|---|

| Anonymous | Properties – SELECT | Approved properties only | Draft, pending, and rejected properties |

| Anonymous | Sponsors – SELECT | Active sponsors only | Inactive sponsors |

| Anonymous | Property\_sponsors – SELECT | Links to approved properties and active sponsors | Other sponsor links |

| Anonymous | Inquiries – INSERT | Submit inquiries for approved properties | Cannot read inquiries |

| Property owner | Properties – SELECT | Public approved listings and own listings | Other owners' private listings |

| Property owner | Properties – INSERT | Create own listings | Cannot create listings for another owner |

| Property owner | Properties – UPDATE | Own draft or rejected listings | Other owners' listings and approved or pending listings |

| Property owner | Properties – DELETE | Own draft or rejected listings | Other owners' listings and approved or pending listings |

| Property owner | Inquiries – SELECT | Inquiries linked to own properties | Inquiries linked to other owners' properties |

| Admin | Inquiries – SELECT | All inquiries | None under the inquiry SELECT policy |

| Authenticated non-admin | Inquiries – SELECT | Inquiries linked to own properties | Unrelated inquiries |



\## 3. RLS Policy Implementation



RLS was enabled on all five tables:



\- `profiles`

\- `properties`

\- `sponsors`

\- `property\_sponsors`

\- `inquiries`



Policies were created to enforce:



1\. Public access to approved property listings.

2\. Public access to active sponsors.

3\. Public access only to sponsor links associated with approved properties and active sponsors.

4\. Property owners' access to their own listings.

5\. Property owners' ability to update and delete only their own draft or rejected listings.

6\. Anonymous and authenticated visitors' ability to submit inquiries for approved properties.

7\. Inquiry SELECT access restricted to admins and owners of the associated properties.



\## 4. Verification Evidence



The following SQL checks were executed in the Supabase SQL Editor.



\### RLS Policy Setup



The policy creation SQL executed successfully and returned:



`Success. No rows returned.`



\### RLS Verification



The following query was used to verify RLS status:



```sql

SELECT

&#x20;   tablename,

&#x20;   rowsecurity AS rls\_enabled

FROM pg\_tables

WHERE schemaname = 'public'

&#x20; AND tablename IN (

&#x20;   'profiles',

&#x20;   'sponsors',

&#x20;   'properties',

&#x20;   'property\_sponsors',

&#x20;   'inquiries'

&#x20; )

ORDER BY tablename;

```



Expected result: all five tables have `rls\_enabled = true`.



\### Policy Inspection



The `pg\_policies` system view was queried to inspect policy names, roles, operations, conditions, and checks.



\## 5. Security Testing



The following access scenarios should be tested using separate anonymous and authenticated user sessions:



| Test | Expected result |

|---|---|

| Anonymous user reads approved properties | Allowed |

| Anonymous user reads draft properties | Denied |

| Anonymous user reads active sponsors | Allowed |

| Anonymous user reads inactive sponsors | Denied |

| Anonymous user submits an inquiry for an approved property | Allowed |

| Anonymous user reads inquiries | Denied |

| Owner reads another owner's private listing | Denied |

| Owner updates another owner's listing | Denied |

| Owner updates their own approved listing | Denied |

| Owner reads inquiries for their own property | Allowed |

| Owner reads inquiries for another owner's property | Denied |

| Admin reads inquiries | Allowed |



These scenarios are the expected outcomes from the configured policies. They should not be treated as independently executed tests unless supported by recorded test results.



\## 6. Administrative Access



Administrative inquiry access is determined through the authenticated user's profile. The policy checks whether the user's profile has `is\_admin = true` or `role = 'admin'`.



Any elevated server-side operations must use a server-only Supabase service-role key. This key must never be exposed in browser-side code.



\## 7. Conclusion



RLS policies have been configured for all five database tables. The policies are designed to protect private property records and inquiries while allowing public visitors to access approved listings, active sponsors, and submit inquiries for approved properties.

