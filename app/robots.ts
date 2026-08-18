import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // PSEO pages live under /outputs/ and /for/ — these MUST be crawlable.
        // (The previous starter disallowed /outputs/, which would have hidden
        // every generated page from Google.)
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
