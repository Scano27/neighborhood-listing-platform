import { validateSponsorUrl } from "./sponsor-url-schema";

const validUrl = "https://example.com/jewelry";
const unsafeUrl = "javascript:alert(1)";

console.log(
  "Valid URL result:",
  JSON.stringify(validateSponsorUrl(validUrl), null, 2)
);

console.log(
  "Unsafe URL result:",
  JSON.stringify(validateSponsorUrl(unsafeUrl), null, 2)
);