import type { Sponsor } from "../types";

interface SponsorBannerProps {
  sponsor: Sponsor;
}

export default function SponsorBanner({
  sponsor,
}: SponsorBannerProps) {
  const disclosureId = `sponsor-disclosure-${sponsor.id}`;

  return (
    <section
      aria-label={`Sponsored content from ${sponsor.businessName}`}
      className="rounded-lg border bg-gray-50 p-4"
    >
      {/* Visible commercial disclosure */}
      <p
        id={disclosureId}
        className="text-sm font-semibold"
      >
        Sponsored Partner
      </p>

      <h2 className="mt-1 text-lg font-semibold">
        {sponsor.businessName}
      </h2>

      <a
        href={sponsor.websiteUrl}
        aria-describedby={disclosureId}
        aria-label={`Visit ${sponsor.businessName}. Sponsored partner link.`}
        className="mt-2 inline-block underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Visit {sponsor.businessName}
      </a>
    </section>
  );
}