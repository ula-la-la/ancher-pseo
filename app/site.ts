/** Single source of truth for the canonical origin. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ancher.us"
).replace(/\/$/, "");

export const siteName = "Ancher Output Gallery";
export const appUrl = "https://ancher.ai";
