import type { Sponsor } from "../types";

interface SponsorBannerProps {
  sponsor: Sponsor;
}

export default function SponsorBanner({
  sponsor,
}: SponsorBannerProps) {
  return (
    <section
      aria-labelledby="sponsor-heading"
      className="rounded-lg border bg-gray-50 p-4"
    >
      <p className="text-sm font-medium">
        Sponsored
      </p>

      <h2
        id="sponsor-heading"
        className="mt-1 text-lg font-semibold"
      >
        {sponsor.businessName}
      </h2>

      <a
        href={sponsor.websiteUrl}
        className="mt-2 inline-block underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Visit {sponsor.businessName}
      </a>
    </section>
  );
}