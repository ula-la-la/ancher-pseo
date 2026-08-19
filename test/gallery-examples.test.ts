import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import type { GalleryItem } from "../app/data/gallery";

const galleryModulePath = "../app/data/gallery.ts";
const { featuredItem, galleryItems } = await import(galleryModulePath) as {
  featuredItem: GalleryItem;
  galleryItems: GalleryItem[];
};

const expectedSlugs = [
  "market-research-report", "competitive-analysis", "content-brief", "research-report",
  "executive-summary", "project-status-report", "product-requirements-document", "meeting-notes",
  "startup-pitch-deck", "case-study", "study-guide", "competitive-landscape",
  "competitor-matrix", "website-competitor-analysis", "investment-position-memo-softbank",
  "macro-brief-treasury-yields", "market-entry-brief-costco-medicare", "analyst-call-tracker",
  "notebooklm-alternatives", "pocket-alternatives-read-later", "readwise-alternatives",
  "second-brain-app", "obsidian-vs-notion", "summarize-pdf-with-ai", "youtube-video-to-notes",
  "podcast-to-brief", "saved-articles-to-newsletter", "organize-research-papers",
  "literature-review", "board-update", "user-research-synthesis", "vc-deal-memo",
  "weekly-digest-deck", "ai-model-comparison-post",
] as const;

test("publishes complete image-backed X examples for all gallery items", async () => {
  const modulePath = "../app/data/galleryExamples.ts";
  const [examplesModule, promptsModule] = await Promise.all([
    import(modulePath).catch(() => null),
    import("../app/data/galleryPrompts.ts"),
  ]);

  assert.ok(examplesModule, "gallery example data should exist");

  const examples = examplesModule.galleryExamples as Record<string, {
    category: string;
    title: string;
    summary: string;
    sections: Array<{ title: string; body: string[] }>;
    sources: Array<{
      tweetId: string;
      author: string;
      avatar: string;
      images?: Array<{ src: string; alt: string }>;
      text: string;
      url: string;
    }>;
  }>;
  const publishedItems = galleryItems;
  assert.deepEqual(Object.keys(examples), expectedSlugs);
  assert.deepEqual(publishedItems.map((item) => item.slug), expectedSlugs);

  for (const item of publishedItems) {
    const example = examples[item.slug];

    assert.ok(example, `${item.slug} should have a finished example`);
    assert.equal(item.status, "ready", `${item.slug} should be published`);
    assert.equal(example.category, item.category);
    assert.ok(example.title.length > 10);
    assert.ok(example.summary.length > 40);
    assert.ok(example.sections.length >= 4, `${item.slug} should contain a complete deliverable`);
    assert.ok(example.sections.every((section) => section.title && section.body.length > 0));
    const prompt = promptsModule.galleryPrompts[item.slug as keyof typeof promptsModule.galleryPrompts];
    assert.ok(prompt, `${item.slug} should have a sourced prompt`);
    assert.equal(example.sources.length, 1, `${item.slug} should only cite its original prompt post`);
    assert.equal(example.sources[0].tweetId, prompt.source.tweetId);
    assert.ok(example.sources.every((source) =>
      source.tweetId && source.author && source.text && /^https:\/\/x\.com\/.+\/status\/\d+$/.test(source.url)
    ));
    assert.ok(example.sources.every((source) => /^\/x-sources\/avatars\/.+\.(jpg|jpeg|png|webp)$/.test(source.avatar)));
    assert.ok(example.sources.every((source) => {
      const avatarPath = resolve(process.cwd(), "public", source.avatar.slice(1));
      return existsSync(avatarPath) && statSync(avatarPath).size > 0;
    }), `${item.slug} should store every source avatar locally`);

    const images = example.sources.flatMap((source) => source.images ?? []);
    assert.ok(images.length > 0, `${item.slug} should include at least one tweet image`);
    assert.ok(images.every((image) => {
      const imagePath = resolve(process.cwd(), "public", image.src.slice(1));
      return image.alt && /^\/x-sources\/media\/.+\.(jpg|jpeg|png|webp)$/.test(image.src) && existsSync(imagePath) && statSync(imagePath).size > 0;
    }), `${item.slug} should store tweet images locally with alt text`);
  }

  assert.ok(publishedItems.every((item: GalleryItem) => item.status === "ready"));
  assert.equal(new Set(Object.values(examples).flatMap((example) => example.sources.map((source) => source.tweetId))).size, 34);
  assert.equal(featuredItem.slug, "market-research-report");
  assert.equal(featuredItem.status, "ready", "the original featured template should be one of the ten published prompts");
  assert.ok(featuredItem.slug in examples);
});

test("publishes directly usable prompts from unique original X posts for all homepage templates", async () => {
  const promptModule = await import("../app/data/galleryPrompts.ts").catch(() => null);

  assert.ok(promptModule, "gallery prompt data should exist");
  assert.deepEqual(promptModule.promptTemplateSlugs, expectedSlugs);
  assert.deepEqual(Object.keys(promptModule.galleryPrompts), expectedSlugs);
  assert.deepEqual(galleryItems.map((item) => item.slug), expectedSlugs);

  const tweetIds = expectedSlugs.map((slug) => promptModule.galleryPrompts[slug].source.tweetId);
  assert.equal(new Set(tweetIds).size, expectedSlugs.length, "every template should use a unique original post");

  for (const slug of expectedSlugs) {
    const prompt = promptModule.galleryPrompts[slug] as {
      body: string;
      query: string;
      source: {
        tweetId: string;
        author: string;
        avatar: string;
        images: Array<{ src: string; alt: string }>;
        originalText: string;
        url: string;
        publishedAt: string;
      };
    };

    assert.ok(prompt.body.length >= 40, `${slug} should include a complete usable prompt`);
    assert.match(prompt.query, /prompt/i);
    assert.match(prompt.source.originalText, /prompt/i, `${slug} should come from a post that explicitly identifies a prompt`);
    assert.match(prompt.source.url, /^https:\/\/x\.com\/.+\/status\/\d+$/);
    assert.equal(prompt.source.tweetId, prompt.source.url.split("/").at(-1));
    assert.match(prompt.source.publishedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(prompt.source.avatar, /^\/x-sources\/avatars\/.+\.(jpg|jpeg|png|webp)$/);
    const avatarPath = resolve(process.cwd(), "public", prompt.source.avatar.slice(1));
    assert.ok(existsSync(avatarPath) && statSync(avatarPath).size > 0, `${slug} should store its prompt author avatar locally`);
    assert.ok(prompt.source.images.length > 0, `${slug} should include original-post media`);
    assert.ok(prompt.source.images.every((image) => {
      const imagePath = resolve(process.cwd(), "public", image.src.slice(1));
      return image.alt.length > 0 && existsSync(imagePath) && statSync(imagePath).size > 0;
    }), `${slug} should store original-post media locally with alt text`);
  }
});

test("preserves complete long-form prompts instead of summaries", async () => {
  const { galleryPrompts } = await import("../app/data/galleryPrompts.ts");
  const postTextMinimums = {
    "competitor-matrix": 350,
    "analyst-call-tracker": 550,
    "notebooklm-alternatives": 900,
    "readwise-alternatives": 2500,
    "second-brain-app": 1000,
    "youtube-video-to-notes": 900,
    "user-research-synthesis": 6500,
  } as const;

  for (const [slug, minimum] of Object.entries(postTextMinimums)) {
    const prompt = galleryPrompts[slug as keyof typeof galleryPrompts];
    assert.ok(prompt.body.length >= minimum, `${slug} should keep the complete prompt text`);
    assert.ok(
      prompt.source.originalText.includes(prompt.body),
      `${slug} should copy the prompt from the full original post without rewriting it`,
    );
  }

  assert.ok(
    galleryPrompts["organize-research-papers"].body.length >= 850,
    "image-only research-paper prompt should keep the complete visible transcription",
  );
});
