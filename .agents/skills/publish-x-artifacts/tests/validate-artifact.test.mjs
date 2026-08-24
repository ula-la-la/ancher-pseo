import assert from "node:assert/strict";
import test from "node:test";

import { validateArtifact } from "../scripts/validate-artifact.mjs";

const sourceUrl = "https://x.com/example/status/1234567890123456789";
const editorialTitle = "How to Read a Competitor Campaign Before Sales Slip Further";

function validHtml() {
  return `<!doctype html>
  <html><head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A practical field guide for reading a competitor campaign's messaging, channels, and audience before choosing a response.">
    <title>${editorialTitle}</title>
  </head><body>
    <main><article>
      <h1>${editorialTitle}</h1>
      <p>A sales decline can be an early signal that a competitor has changed its campaign.</p>
      <h2>Start with the campaign signal</h2>
      <p>Capture the message, channel, audience, offer, cadence, and evidence before deciding how to respond.</p>
      <h2>Turn observations into action</h2>
      <ol><li>Collect visible campaign evidence.</li><li>Compare the audience and promise.</li><li>Choose a measurable response.</li></ol>
    </article></main>
    <footer><a href="https://app.ancher.ai">Design in ancher</a></footer>
  </body></html>`;
}

const job = {
  slug: "competitive-analysis",
  outputType: "Competitive analysis",
  editorialTitle,
  sourceText: "A business is experiencing a decline in sales and suspects a competitor campaign. Gather intelligence on messaging, channels, and target audience, then provide implementation steps.",
  sources: [{ url: sourceUrl }],
  disallowedTerms: ["Northwind Analytics", "Rally", "Atlas Insights"],
};

function codes(html, override = {}) {
  return validateArtifact({ html, job: { ...job, ...override } }).map(({ code }) => code);
}

test("accepts a concise source-faithful Artifact without X source UI", () => {
  assert.deepEqual(validateArtifact({ html: validHtml(), job }), []);
});

test("requires one exact linked footer and nothing visible after it", () => {
  const unlinked = validHtml().replace(
    '<footer><a href="https://app.ancher.ai">Design in ancher</a></footer>',
    "<footer>Design in ancher</footer>",
  );
  assert.ok(codes(unlinked).includes("footer-link"));

  const wrongUrl = validHtml().replace("https://app.ancher.ai", "https://ancher.us");
  assert.ok(codes(wrongUrl).includes("footer-link"));

  const afterFooter = validHtml().replace("</footer>", "</footer><p>More marketing copy</p>");
  assert.ok(codes(afterFooter).includes("after-footer"));
});

test("rejects invented example framing and source UI inside the Artifact", () => {
  const invalid = validHtml()
    .replace("<main>", "<main><p>Illustrative example</p><h2>Source Trail</h2>")
    .replace("</main>", `<a href="${sourceUrl}">Original X post</a></main>`);
  const errors = codes(invalid);
  assert.ok(errors.includes("example-framing"));
  assert.ok(errors.includes("artifact-source-ui"));
});

test("rejects generic sample or output-type titles", () => {
  const sample = validHtml().replaceAll(editorialTitle, "Competitive Analysis Example");
  assert.ok(codes(sample).includes("generic-title"));

  const outputType = validHtml().replaceAll(editorialTitle, "Competitive analysis");
  assert.ok(codes(outputType).includes("generic-title"));
});

test("rejects known invented entities absent from the locked source brief", () => {
  const invalid = validHtml().replace(
    "A sales decline",
    "Northwind Analytics reports that a sales decline",
  );
  assert.ok(codes(invalid).includes("invented-entity"));
});

test("rejects internal workflow language but allows source placeholders", () => {
  const internal = validHtml().replace("Start with the campaign signal", "Pending review");
  assert.ok(codes(internal).includes("internal-review-language"));

  const placeholder = validHtml().replace(
    "A sales decline",
    "[company name] sees a sales decline",
  );
  assert.deepEqual(validateArtifact({ html: placeholder, job }), []);
});

test("does not force Gallery SEO keywords or a 700-word minimum into the Artifact", () => {
  const seoJob = {
    ...job,
    primaryKeyword: "competitive analysis template",
    outputMode: "text-first",
  };
  assert.deepEqual(validateArtifact({ html: validHtml(), job: seoJob }), []);
});
