import { galleryItems, type GalleryItem } from "./gallery";
import { galleryArtifacts } from "./galleryArtifacts";

const publicGallerySlugs = new Set(
  Object.values(galleryArtifacts)
    .filter((artifact) => artifact.status === "published")
    .map((artifact) => artifact.slug),
);

export const publicGalleryItems = galleryItems.filter((item) =>
  publicGallerySlugs.has(item.slug),
);

export const featuredPublicItem = publicGalleryItems[0];

export function getPublicGalleryItem(slug: string): GalleryItem | undefined {
  return publicGalleryItems.find((item) => item.slug === slug);
}
