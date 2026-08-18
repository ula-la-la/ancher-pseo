import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "./site";

export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    /**
     * Deliberately NOT `Disallow: /`.
     *
     * A crawler that is blocked in robots.txt never fetches the page, so it
     * never sees the noindex — and Google can still list a bare URL it found
     * from a link elsewhere. Letting it crawl and read `X-Robots-Tag: noindex`
     * is what actually keeps the site out of the index.
     *
     * The sitemap is withheld so we are not advertising the URL set.
     */
    return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
