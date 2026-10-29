
import { z } from "zod";

export const PropertySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  price: z.number().finite().positive(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().nonnegative(),
  squareFootage: z.number().positive(),
  imageUrl: z.string().min(1),
  imageAltText: z.string().optional(),
  detailsUrl: z.string().min(1),
});

export type ValidatedProperty = z.infer<
  typeof PropertySchema
>;

export function validateProperty(input: unknown) {
  return PropertySchema.safeParse(input);
}