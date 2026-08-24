import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

test("renders the published Ancher output on the Study Guide page", () => {
  const html = readFileSync(
    resolve(process.cwd(), ".next/server/app/templates/study-guide.html"),
    "utf8",
  );

  assert.match(html, /Generated with Ancher/);
  assert.match(html, /Open the.*study guide/);
  assert.match(html, /\/gallery-artifacts\/study-guide\.png/);
  assert.match(html, /artifact-output-preview/);
  assert.match(
    html,
    /https:\/\/transformer-attention-interactive-study-guide-7c06954e7c5026ab\.ancher\.app\//,
  );
  assert.match(html, /Original X post/);
});

test("keeps artifact pages focused on the output, prompt, and source", () => {
  const html = readFileSync(
    resolve(process.cwd(), ".next/server/app/templates/study-guide.html"),
    "utf8",
  );

  assert.match(html, /What you’ll get/);
  assert.match(html, /Learning objectives/);
  assert.match(html, /Original X post/);
  assert.doesNotMatch(html, /About this template/);
  assert.doesNotMatch(html, /<p class="section-label">Finished example<\/p>/);
});

test("pairs the prompt with its source and uses consistent forward actions", () => {
  const html = readFileSync(
    resolve(process.cwd(), ".next/server/app/templates/study-guide.html"),
    "utf8",
  );

  assert.match(html, /class="prompt-source-layout"/);
  assert.match(html, /<h2>Original X post<\/h2>/);
  assert.match(html, /Make your own with Ancher/);
  assert.match(html, /Open the.*study guide/);
  assert.match(html, /See the original post/);
  assert.doesNotMatch(html, /class="draft-note ready-note"/);
  assert.doesNotMatch(html, /Create this template/);
  assert.doesNotMatch(html, /View live Ancher output/);
  assert.doesNotMatch(html, /↗/);
});

test("keeps the source preview compact beside the prompt", () => {
  const html = readFileSync(
    resolve(process.cwd(), ".next/server/app/templates/study-guide.html"),
    "utf8",
  );
  const excerpt = html.match(/<p>([^<]*)<\/p><b>See the original post/)?.[1];

  assert.ok(excerpt, "expected a visible source excerpt");
  assert.ok(excerpt.length <= 220, `source excerpt was ${excerpt.length} characters`);
  assert.match(html, /class="compact-source-card"/);
});
