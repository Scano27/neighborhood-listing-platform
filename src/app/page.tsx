import PropertyCard from "../components/PropertyCard";
import SearchFilters from "../components/SearchFilters";
import SponsorBanner from "../components/SponsorBanner";
import type { Property, Sponsor } from "../types";

const properties: Property[] = [
  {
    id: "property-1",
    title: "Modern Family Home",
    address: "123 Maple Street",
    city: "Los Angeles",
    price: 685000,
    bedrooms: 3,
    bathrooms: 2,
    squareFootage: 1850,
    imageUrl: "/property-1.svg",
    imageAltText: "Modern family home on Maple Street",
    detailsUrl: "#property-1",
  },
  {
    id: "property-2",
    title: "Downtown Condo",
    address: "456 Main Avenue",
    city: "Los Angeles",
    price: 525000,
    bedrooms: 2,
    bathrooms: 2,
    squareFootage: 1100,
    imageUrl: "/property-2.svg",
    imageAltText: "Downtown condo on Main Avenue",
    detailsUrl: "#property-2",
  },
  {
    id: "property-3",
    title: "Quiet Neighborhood Home",
    address: "789 Oak Drive",
    city: "Los Angeles",
    price: 745000,
    bedrooms: 4,
    bathrooms: 3,
    squareFootage: 2200,
    imageUrl: "/property-3.svg",
    imageAltText: "Quiet neighborhood home on Oak Drive",
    detailsUrl: "#property-3",
  },
];

const sponsor: Sponsor = {
  id: "sponsor-1",
  businessName: "Neighborhood Realty",
  websiteUrl: "https://example.com",
};

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">
        Neighborhood Property Listings
      </h1>

      <p className="mt-2 text-gray-600">
        Browse local properties and connect with neighborhood sponsors.
      </p>

      <div className="mt-8">
        <SearchFilters />
      </div>

      <section
        aria-labelledby="listings-heading"
        className="mt-8"
      >
        <h2
          id="listings-heading"
          className="text-2xl font-semibold"
        >
          Available Properties
        </h2>

        <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </section>

      <div className="mt-8">
        <SponsorBanner sponsor={sponsor} />
      </div>
    </main>
  );
}