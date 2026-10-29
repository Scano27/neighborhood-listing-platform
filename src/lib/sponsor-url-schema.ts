import { z } from "zod";

export const SponsorUrlSchema = z
  .string()
  .url("Enter a valid URL.")
  .refine((value) => {
    try {
      const url = new URL(value);

      return (
        url.protocol === "https:" &&
        url.hostname.length > 0 &&
        !url.hostname.startsWith("[") &&
        !/^\d{1,3}(\.\d{1,3}){3}$/.test(url.hostname) &&
        url.hostname !== "localhost"
      );
    } catch {
      return false;
    }
  }, "URL must use HTTPS and a permitted public hostname.");

export function validateSponsorUrl(input: unknown) {
  const result = SponsorUrlSchema.safeParse(input);

  if (!result.success) {
    return {
      ok: false,
      error: {
        code: "INVALID_SPONSOR_URL",
        field: "websiteUrl",
        message:
          "Enter a valid HTTPS URL using a permitted public hostname.",
      },
    };
  }

  return {
    ok: true,
    data: {
      websiteUrl: result.data,
    },
  };
}