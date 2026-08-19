import { getGalleryItem, type GalleryCategory, type GalleryItem } from "./gallery.ts";
import { galleryPrompts, promptTemplateSlugs } from "./galleryPrompts.ts";

export type GalleryExample = {
  category: GalleryCategory;
  title: string;
  summary: string;
  pulledAt: string;
  methodology: string;
  sections: Array<{
    title: string;
    body: string[];
    bullets?: string[];
  }>;
  sources: Array<{
    tweetId: string;
    author: string;
    avatar: string;
    images?: Array<{ src: string; alt: string }>;
    text: string;
    url: string;
    publishedAt: string;
  }>;
};

function buildPromptExample(item: GalleryItem): GalleryExample {
  const prompt = galleryPrompts[item.slug as keyof typeof galleryPrompts];
  const outputName = item.outputType.toLowerCase();

  return {
    category: item.category,
    title: item.title.replace("Example", "Worked Example"),
    summary: `${item.description} This example starts from a directly usable prompt shared in the original X post, with the source preserved below for inspection.`,
    pulledAt: prompt.source.publishedAt,
    methodology: `Built from the original prompt post by @${prompt.source.author}. The prompt is preserved as the reusable input; the post and its media remain visible in the source trail.`,
    sections: [
      {
        title: item.included[0] ?? "Executive read",
        body: [
          item.description,
          `Use the sourced prompt above as the starting brief, then replace its placeholders with your own ${item.inputType.toLowerCase()}.`,
        ],
      },
      {
        title: `Structure of the ${outputName}`,
        body: [
          `The prompt asks for a decision-ready ${outputName} rather than a workflow summary. Its requested sections map directly to the finished deliverable.`,
        ],
        bullets: item.included,
      },
      {
        title: "How to adapt the prompt",
        body: [
          "Replace the topic, audience, constraints, source material, and desired depth before running it. Keep the requested output structure intact until the first draft is complete.",
        ],
      },
      {
        title: "Evidence checks and limits",
        body: [
          "Treat the original X post as the provenance for the prompt, not as verification of every claim the generated output may contain. Check consequential statements against your own source material before publishing or acting on the result.",
        ],
      },
      {
        title: "Recommended next step",
        body: [
          `Run the prompt with ${item.sourceRequirements.charAt(0).toLowerCase()}${item.sourceRequirements.slice(1)} Then review the draft for missing evidence, remove unsupported claims, and keep links to the sources that support the final output.`,
        ],
      },
    ],
    sources: [{
      tweetId: prompt.source.tweetId,
      author: prompt.source.author,
      avatar: prompt.source.avatar,
      images: prompt.source.images,
      text: prompt.source.originalText,
      url: prompt.source.url,
      publishedAt: prompt.source.publishedAt,
    }],
  };
}

export const galleryExamples: Record<string, GalleryExample> = Object.fromEntries(
  promptTemplateSlugs.map((slug) => {
    const item = getGalleryItem(slug);
    if (!item) throw new Error(`Missing gallery item for prompt template: ${slug}`);
    return [slug, buildPromptExample(item)];
  }),
);
