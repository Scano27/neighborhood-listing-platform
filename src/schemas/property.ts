
import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  price: z.number().positive("Price must be greater than zero"),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().min(0),
  square_feet: z.number().int().positive(),
});

export type PropertyInput = z.infer<typeof propertySchema>;
