
import { validateProperty } from "./property-schema";

const exampleA = {
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

const exampleB = {
  id: "property-2",
  title: "Downtown Condo",
  address: "456 Main Street",
  city: "Los Angeles",
  price: -250000,
  bedrooms: 2,
  bathrooms: 2,
  squareFootage: 1100,
  imageUrl: "/property-2.svg",
  detailsUrl: "/listings/property-2",
};

console.log("Example A:", validateProperty(exampleA).success);
console.log("Example B:", validateProperty(exampleB).success);