import assert from "node:assert/strict";
import test from "node:test";

import { validateArtifact } from "../scripts/validate-artifact.mjs";

const sourceUrl = "https://x.com/example/status/1234567890123456789";
const primaryKeyword = "competitive analysis template";

function article(words = 760) {
  return Array.from({ length: words }, (_, index) =>
    index % 17 === 0 ? "competitive" : index % 19 === 0 ? "analysis" : "evidence",
  ).join(" ");
}

function validHtml() {
  return `<!doctype html>
  <html><head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Use this competitive analysis template to examine messaging, channels, audiences, evidence, risks, and practical next steps for a stronger market response.">
    <title>Competitive Analysis Template for Marketing Campaigns</title>
  </head><body>
    <main><article>
      <h1>Competitive Analysis Template for Marketing Campaigns</h1>
      <h2>Executive summary</h2><p>${article()}</p>
      <section id="sources"><h2>Original X source</h2><a href="${sourceUrl}">Source post</a></section>
    </article></main>
    <footer>Design in ancher</footer>
  </body></html>`;
}

const job = {
  slug: "competitive-analysis",
  outputMode: "text-first",
  primaryKeyword,
  sources: [{ url: sourceUrl }],
};

test("accepts a text-first SEO artifact with its exact X source and footer", () => {
  assert.deepEqual(validateArtifact({ html: validHtml(), job }), []);
});

test("rejects linked or legacy footer branding", () => {
  const linked = validHtml().replace(
    "<footer>Design in ancher</footer>",
    '<footer><a href="https://ancher.us">Designed in Ancher</a></footer>',
  );
  const errors = validateArtifact({ html: linked, job });
  assert.ok(errors.some((error) => error.code === "footer-exact"));
  assert.ok(errors.some((error) => error.code === "footer-linked"));
});

test("rejects thin workbench output for a text-first job", () => {
  const controls = "<input>".repeat(15);
  const thin = validHtml().replace(article(), `Short dashboard. ${controls}`);
  const errors = validateArtifact({ html: thin, job });
  assert.ok(errors.some((error) => error.code === "visible-word-count"));
  assert.ok(errors.some((error) => error.code === "tool-heavy"));
});

test("rejects missing sources, review language, and unrelated Ancher domains", () => {
  const invalid = validHtml()
    .replace(sourceUrl, "https://example.com")
    .replace("Executive summary", "Private review")
    .replace("</main>", '<p>Visit app.ancher.ai</p></main>');
  const errors = validateArtifact({ html: invalid, job });
  assert.ok(errors.some((error) => error.code === "source-missing"));
  assert.ok(errors.some((error) => error.code === "internal-review-language"));
  assert.ok(errors.some((error) => error.code === "ancher-domain"));
});

test("rejects SEO metadata that does not carry the primary keyword", () => {
  const invalid = validHtml()
    .replaceAll("Competitive Analysis Template", "Campaign Research")
    .replace("competitive analysis template", "campaign research guide");
  const errors = validateArtifact({ html: invalid, job });
  assert.ok(errors.some((error) => error.code === "keyword-title"));
  assert.ok(errors.some((error) => error.code === "keyword-h1"));
});
