"use client";

import { FormEvent, useState } from "react";

export default function SearchFilters() {
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Search submitted:", {
      propertyType,
      priceRange,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-lg border bg-white p-4 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="property-type"
            className="mb-1 block font-medium"
          >
            Property type
          </label>

          <select
            id="property-type"
            name="propertyType"
            value={propertyType}
            onChange={(event) => setPropertyType(event.target.value)}
            className="w-full rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <option value="">Any property type</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="price-range"
            className="mb-1 block font-medium"
          >
            Price range
          </label>

          <select
            id="price-range"
            name="priceRange"
            value={priceRange}
            onChange={(event) => setPriceRange(event.target.value)}
            className="w-full rounded-md border px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            <option value="">Any price</option>
            <option value="under-500k">Under $500,000</option>
            <option value="500k-750k">$500,000–$750,000</option>
            <option value="over-750k">Over $750,000</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 rounded-md px-4 py-2 font-medium underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      >
        Search properties
      </button>
    </form>
  );
}