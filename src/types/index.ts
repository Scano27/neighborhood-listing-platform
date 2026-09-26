export interface Property {
  id: string;
  title: string;
  address: string;
  city: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  imageUrl: string;
  imageAltText?: string;
  detailsUrl: string;
}

export interface Sponsor {
  id: string;
  businessName: string;
  websiteUrl: string;
}