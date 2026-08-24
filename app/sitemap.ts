import type { MetadataRoute } from "next";
import { publicGalleryItems } from "./data/publicGallery";
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

    // Only advertise templates backed by published Ancher artifacts.
    ...publicGalleryItems.map((item) => ({
        url: `${siteUrl}/templates/${item.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
