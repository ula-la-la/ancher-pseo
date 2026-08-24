import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const measurementId = "G-DPX1LHWRG0";

test("loads the Ancher US Google tag exactly once on every page", () => {
  for (const path of ["index.html", "templates/content-brief.html"]) {
    const html = readFileSync(resolve(process.cwd(), ".next/server/app", path), "utf8");
    const loaderMatches = html.match(
      new RegExp(
        `<script[^>]+src="https://www\\.googletagmanager\\.com/gtag/js\\?id=${measurementId}"[^>]*>`,
        "g",
      ),
    );
    const configMatches = html.match(
      new RegExp(`<script>window\\.dataLayer[\\s\\S]*?gtag\\('config', '${measurementId}'\\);</script>`, "g"),
    );

    assert.equal(loaderMatches?.length, 1, `${path} must load one Google tag`);
    assert.equal(configMatches?.length, 1, `${path} must configure GA4 once`);
  }
});
