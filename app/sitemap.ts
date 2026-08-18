import type { MetadataRoute } from "next";
import { galleryItems } from "./data/gallery";
import { useCases } from "./data/useCases";
import { outputTypes, packs, prompts, sourceTypes, toSlug } from "./data/prompts";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },

    { url: `${siteUrl}/prompts`, lastModified: now, changeFrequency: "daily" as const, priority: 0.95 },

    // The prompt library is real content from day one, so unlike the pending
    // gallery shells these all belong in the sitemap.
    ...prompts.map((p) => ({
      url: `${siteUrl}/prompts/${p.slug}`,
      lastModified: new Date(p.addedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...packs.map((p) => ({
      url: `${siteUrl}/prompts/pack/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...sourceTypes.map((s) => ({
      url: `${siteUrl}/prompts/source/${toSlug(s)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...outputTypes.map((o) => ({
      url: `${siteUrl}/prompts/output/${toSlug(o)}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),

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
        url: `${siteUrl}/templates/${item.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
