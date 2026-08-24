import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const publicSlugs = [
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

test("publishes only templates backed by completed Ancher artifacts", () => {
  const html = readFileSync(resolve(process.cwd(), ".next/server/app/index.html"), "utf8");
  const templateSlugs = new Set(
    [...html.matchAll(/href="\/templates\/([^"]+)"/g)].map((match) => match[1]),
  );

  assert.deepEqual([...templateSlugs].sort(), [...publicSlugs].sort());
  assert.doesNotMatch(html, /\/templates\/competitive-analysis/);
});

test("advertises only completed artifact templates in the sitemap", () => {
  const xml = readFileSync(
    resolve(process.cwd(), ".next/server/app/sitemap.xml.body"),
    "utf8",
  );
  const templateSlugs = [...xml.matchAll(/\/templates\/([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );

  assert.deepEqual(templateSlugs.sort(), [...publicSlugs].sort());
});

test("does not build hidden template pages or link to them from prompts", () => {
  assert.equal(
    existsSync(
      resolve(process.cwd(), ".next/server/app/templates/competitive-analysis.html"),
    ),
    false,
  );
  const promptHtml = readFileSync(
    resolve(
      process.cwd(),
      ".next/server/app/prompts/competitive-analysis-live-pages.html",
    ),
    "utf8",
  );
  assert.doesNotMatch(promptHtml, /\/templates\/competitive-analysis/);
});

test("opens Google indexing for the public gallery", () => {
  const home = readFileSync(resolve(process.cwd(), ".next/server/app/index.html"), "utf8");
  const artifact = readFileSync(
    resolve(process.cwd(), ".next/server/app/templates/content-brief.html"),
    "utf8",
  );

  assert.match(home, /<meta name="robots" content="index, follow"\/>/);
  assert.match(artifact, /<meta name="robots" content="index, follow"\/>/);
});

test("configures the Worker to serve prerendered artifact pages from static assets", async () => {
  const compiledConfigUrl = new URL(
    "../.open-next/server-functions/default/open-next.config.mjs",
    import.meta.url,
  );
  compiledConfigUrl.searchParams.set("test", String(Date.now()));
  const config = (await import(compiledConfigUrl.href)).default;
  const configuredCache = config.default.override.incrementalCache;
  const incrementalCache =
    typeof configuredCache === "function"
      ? await configuredCache()
      : { name: configuredCache };

  assert.equal(incrementalCache.name, "cf-static-assets-incremental-cache");
  assert.equal(config.dangerous.enableCacheInterception, true);
});

test("keeps a runtime fallback for public artifacts when the edge cache misses", () => {
  const manifest = JSON.parse(
    readFileSync(resolve(process.cwd(), ".next/prerender-manifest.json"), "utf8"),
  );
  const templateRoute = manifest.dynamicRoutes["/templates/[slug]"];

  assert.equal(templateRoute.compute, "blocking");
  assert.equal(templateRoute.fallback, null);
});
