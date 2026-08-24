import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const batch = [
  ["board-update", "2086377323578949870", "founder", "https://cfo-board-report-financial-dashboard-6a5e891e1fa22937.ancher.app/"],
  ["analyst-call-tracker", "1772458620170441024", "investor", "https://nvda-q4-fy24-earnings-evidence-tracker-e847deb2e7b30d3d.ancher.app/"],
  ["literature-review", "2016131687273341190", "researcher", "https://timexer-and-financial-transformers-evidence-ma-768c38ac445c1f1c.ancher.app/"],
  ["content-brief", "2018991436222591434", "creator", "https://ai-productivity-tools-seo-content-brief-934b9e24e3742709.ancher.app/"],
  ["user-research-synthesis", "2044375991867318680", "product-growth", "https://jtbd-interview-synthesis-dashboard-f1cad6e39349e64b.ancher.app/"],
  ["market-research-report", "1929321780319039955", "consultant", "https://wedding-photography-market-disruption-report-1f68bbe5c235b768.ancher.app/"],
];

const seoBatch = [
  ["research-report", "1879566024720494745", "researcher", "https://the-leaked-gemini-prompt-for-editing-source-gr-d8669bfe0ebbe785.ancher.app/"],
  ["executive-summary", "1845071746774466795", "founder", "https://turn-any-book-into-an-executive-brief-with-one-f07341512b49e473.ancher.app/"],
  ["project-status-report", "1905905648552071547", "product-growth", "https://six-signals-that-make-a-weekly-project-update-e61dc63e693d4659.ancher.app/"],
  ["product-requirements-document", "2051957694454444370", "product-growth", "https://the-prd-prompt-to-run-before-you-write-a-singl-69f45bf7b990bf2e.ancher.app/"],
  ["meeting-notes", "1897224845798334552", "founder", "https://turn-a-60-minute-meeting-into-a-200-word-decis-b9405d13891790c1.ancher.app/"],
];

test("registers one published Ancher artifact for each approved TA", () => {
  const source = readFileSync(
    resolve(process.cwd(), "app/data/galleryArtifacts.ts"),
    "utf8",
  );

  for (const [slug, tweetId, audience, shareUrl] of batch) {
    const entry = source.match(new RegExp(`"${slug}":[\\s\\S]*?\\n  },`))?.[0];
    assert.ok(entry, `missing artifact entry for ${slug}`);
    assert.match(entry, new RegExp(`tweetId: "${tweetId}"`));
    assert.match(entry, new RegExp(`audience: "${audience}"`));
    assert.match(entry, /status: "published"/);
    assert.ok(entry.includes(`shareUrl: "${shareUrl}"`));
    assert.match(entry, new RegExp(`screenshot: "/gallery-artifacts/${slug}\\.jpg"`));
    assert.ok(
      existsSync(resolve(process.cwd(), `public/gallery-artifacts/${slug}.jpg`)),
      `missing screenshot for ${slug}`,
    );
  }
});

test("registers the approved five with SEO-aligned public Ancher links", () => {
  const source = readFileSync(
    resolve(process.cwd(), "app/data/galleryArtifacts.ts"),
    "utf8",
  );

  for (const [slug, tweetId, audience, shareUrl] of seoBatch) {
    const entry = source.match(new RegExp(`"${slug}":[\\s\\S]*?\\n  },`))?.[0];
    assert.ok(entry, `missing artifact entry for ${slug}`);
    assert.match(entry, new RegExp(`tweetId: "${tweetId}"`));
    assert.match(entry, new RegExp(`audience: "${audience}"`));
    assert.match(entry, /status: "published"/);
    assert.ok(entry.includes(`shareUrl: "${shareUrl}"`));
    assert.match(entry, new RegExp(`screenshot: "/gallery-artifacts/${slug}\\.png"`));
    assert.ok(
      existsSync(resolve(process.cwd(), `public/gallery-artifacts/${slug}.png`)),
      `missing screenshot for ${slug}`,
    );
  }
});

test("renders review artifacts without claiming they are published", () => {
  const source = readFileSync(
    resolve(process.cwd(), "app/templates/[slug]/page.tsx"),
    "utf8",
  );

  assert.match(source, /awaiting manual review/);
  assert.match(source, /Review the/);
  assert.match(source, /artifact\.status === "published"/);

  const preview = readFileSync(
    resolve(process.cwd(), "app/components/OutputPreview.tsx"),
    "utf8",
  );
  assert.match(preview, /Awaiting screenshot/);
  assert.match(preview, /artifact-review-preview/);
});

test("keeps every review HTML traceable to its X source and Ancher", () => {
  for (const [slug, tweetId] of batch) {
    const html = readFileSync(
      resolve(process.cwd(), `public/_review/${slug}.html`),
      "utf8",
    );

    assert.match(html, new RegExp(`https://x\\.com/.+?/status/${tweetId}`));
    assert.match(html, /href="https:\/\/ancher\.us\/"[^>]*>Designed in Ancher<\/a>/);
    assert.match(html, /<meta name="viewport"/);
  }
});
