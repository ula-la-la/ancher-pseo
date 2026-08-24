import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

test("allows the completed artifact template pages into search", () => {
  const html = readFileSync(
    resolve(process.cwd(), ".next/server/app/templates/content-brief.html"),
    "utf8",
  );
  const robots = html.match(/<meta name="robots" content="([^"]+)"\/>/)?.[1];

  assert.ok(robots, "missing robots metadata from the production page");
  assert.match(robots, /index/);
  assert.match(robots, /follow/);
  assert.doesNotMatch(robots, /noindex/);
});
