import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";

const css = readFileSync(resolve(process.cwd(), "app/globals.css"), "utf8");

test("keeps the prompt and source columns balanced", () => {
  assert.match(
    css,
    /\.prompt-source-layout\s*\{[^}]*grid-template-columns:minmax\(0,1fr\) minmax\(0,1fr\)/,
  );
});

test("shows only four prompt lines before scrolling", () => {
  assert.match(
    css,
    /\.prompt-source-layout \.template-prompt-body\s*\{[^}]*max-height:calc\(7em \+ 48px\)/,
  );
  assert.match(
    css,
    /\.prompt-source-layout \.template-prompt-body\s*\{[^}]*overflow-y:auto/,
  );
});

test("keeps the source card compact beside the prompt", () => {
  assert.match(
    css,
    /\.prompt-source-layout \.compact-source-card \.x-source-media span\s*\{[^}]*height:clamp\(100px,8vw,120px\)/,
  );
});

test("stacks the two columns before their headings become cramped", () => {
  assert.match(
    css,
    /@media\(max-width:820px\)\{\.prompt-source-layout\{grid-template-columns:1fr/,
  );
});
