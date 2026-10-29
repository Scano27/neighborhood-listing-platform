
import type { Property } from "../types";

const apiResponse: unknown = {
  id: "property-1",
  title: "Modern Family Home",
  address: "123 Main Street",
  city: "Los Angeles",
  price: "not-a-number",
  bedrooms: 3,
  bathrooms: 2,
  squareFootage: 1500,
  imageUrl: "/property-1.svg",
  detailsUrl: "/listings/property-1",
};

// Unsafe: this assertion does not validate the data.
const listing = apiResponse as Property;

// This can crash because price is actually a string.
console.log(listing.price.toFixed(2));