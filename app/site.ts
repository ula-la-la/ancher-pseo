/** Single source of truth for the canonical origin. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ancher.us"
).replace(/\/$/, "");

export const siteName = "Ancher Template Gallery";
/** Marketing site — use-case pages, brand links. */
export const appUrl = "https://ancher.ai";
/** Where every "Create with Ancher" CTA goes. */
export const signupUrl = "https://app.ancher.ai/register";

/**
 * Search-engine visibility switch.
 *
 * While this is false the whole site is served with `X-Robots-Tag: noindex,
 * nofollow` and a matching robots meta tag. The site is publicly reachable —
 * this stops it being *indexed*, not being *read*. For genuine privacy use
 * Cloudflare Access or Basic auth instead.
 *
 * Flip it by setting NEXT_PUBLIC_INDEXABLE=true in wrangler.jsonc `vars`
 * (and in the Workers Builds environment, if deploying from Git) and
 * redeploying. It is read at build time, so a redeploy is required.
 */
export const indexable = process.env.NEXT_PUBLIC_INDEXABLE === "true";
