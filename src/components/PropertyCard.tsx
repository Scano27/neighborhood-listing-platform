import Image from "next/image";
import type { Property } from "../types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article
      aria-labelledby={`property-${property.id}-title`}
      className="overflow-hidden rounded-lg border bg-white shadow-sm"
    >
      <Image
        src={property.imageUrl}
        alt={
          property.imageAltText ??
          `${property.title} - ${property.address}, ${property.city}`
        }
        width={400}
        height={250}
        loading={property.id === "property-3" ? "eager" : "lazy"}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <header>
          <h2
            id={`property-${property.id}-title`}
            className="text-xl font-semibold"
          >
            {property.title}
          </h2>
        </header>

        <p className="mt-2 text-gray-600">
          {property.address}, {property.city}
        </p>

        <p className="mt-3 text-2xl font-bold">
          ${property.price.toLocaleString()}
        </p>

        <ul
          aria-label={`Features of ${property.title}`}
          className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600"
        >
          <li>{property.bedrooms} bedrooms</li>
          <li>{property.bathrooms} bathrooms</li>
          <li>{property.squareFootage.toLocaleString()} sq ft</li>
        </ul>

        <a
          href={property.detailsUrl}
          aria-label={`View details for ${property.title}`}
          className="mt-4 inline-block rounded-md px-3 py-2 font-medium underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          View {property.title} details
        </a>
      </div>
    </article>
  );
}