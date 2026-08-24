import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import test from "node:test";

const appOutput = resolve(process.cwd(), ".next/server/app");

const artifactSlugs = [
  "study-guide",
  "board-update",
  "analyst-call-tracker",
  "literature-review",
  "content-brief",
  "user-research-synthesis",
  "market-research-report",
  "research-report",
  "executive-summary",
  "project-status-report",
  "product-requirements-document",
  "meeting-notes",
];

const audienceSlugs = [
  "founder",
  "investor",
  "researcher",
  "creator",
  "product",
  "consultant",
];

function htmlFilesBelow(directory) {
  return readdirSync(directory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
    .map((entry) => join(entry.parentPath, entry.name));
}

function robotsContent(html) {
  return html.match(/<meta name="robots" content="([^"]+)"\/>/)?.[1];
}

test("advertises only completed Artifact and Artifact-backed TA pages", () => {
  const xml = readFileSync(join(appOutput, "sitemap.xml.body"), "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  assert.equal(urls.length, 19);
  assert.deepEqual(
    urls.filter((url) => url.includes("/templates/")).sort(),
    artifactSlugs.map((slug) => `https://ancher.us/templates/${slug}`).sort(),
  );
  assert.deepEqual(
    urls.filter((url) => url.includes("/for/")).sort(),
    audienceSlugs.map((slug) => `https://ancher.us/for/${slug}`).sort(),
  );
  assert.equal(urls.some((url) => url.includes("/prompts")), false);
});

test("keeps all 54 Prompt-library URLs accessible but non-indexable", () => {
  const promptFiles = [
    join(appOutput, "prompts.html"),
    ...htmlFilesBelow(join(appOutput, "prompts")),
  ];

  assert.equal(promptFiles.length, 54);
  for (const file of promptFiles) {
    const robots = robotsContent(readFileSync(file, "utf8"));
    assert.ok(robots, `missing robots metadata: ${relative(appOutput, file)}`);
    assert.match(robots, /noindex/, relative(appOutput, file));
    assert.match(robots, /follow/, relative(appOutput, file));
  }
});

test("indexes every TA page only because it contains completed Artifact cards", () => {
  for (const slug of audienceSlugs) {
    const file = join(appOutput, "for", `${slug}.html`);
    const html = readFileSync(file, "utf8");
    const robots = robotsContent(html);

    assert.ok(robots, `missing robots metadata: for/${slug}`);
    assert.match(robots, /index/, `for/${slug}`);
    assert.doesNotMatch(robots, /noindex/, `for/${slug}`);
    assert.match(html, /href="\/templates\//, `for/${slug} has no Artifact card`);
    assert.match(html, /gallery-artifacts\//, `for/${slug} has no Artifact screenshot`);
  }
});

