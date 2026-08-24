import type { MetadataRoute } from "next";
import { publicGalleryItems } from "./data/publicGallery";
import { useCases, useCasesBySlug } from "./data/useCases";
import { siteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: siteUrl, lastModified: now, changeFrequency: "daily", priority: 1 },

    // Audience pages qualify only after they contain at least one completed
    // Artifact. Prompt-library pages stay public but are withheld until they
    // carry the same source and Artifact evidence as the template pages.
    ...useCases
      .filter((useCase) =>
        publicGalleryItems.some((item) =>
          (useCasesBySlug[item.slug] ?? []).includes(useCase.slug),
        ),
      )
      .map((useCase) => ({
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
