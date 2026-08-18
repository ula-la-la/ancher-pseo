import type { MetadataRoute } from "next";
import { galleryItems } from "./data/gallery";
import { useCases } from "./data/useCases";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },

    ...useCases.map((useCase) => ({
      url: `${siteUrl}/for/${useCase.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),

    // Only list pages whose output has actually been produced. Listing
    // `status: "pending"` shells would spend crawl budget on thin pages and
    // invite a quality demotion across the whole directory.
    ...galleryItems
      .filter((item) => item.status === "ready")
      .map((item) => ({
        url: `${siteUrl}/outputs/${item.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
