import assert from "node:assert/strict";
import test from "node:test";

const copyModulePath = "../app/lib/copyText.ts";
const copyModule = await import(copyModulePath).catch(() => null);

test("falls back when the browser Clipboard API is unavailable", async () => {
  assert.ok(copyModule, "copy helper should exist");
  let fallbackValue = "";
  const copied = await copyModule.copyText("usable prompt", {
    fallback: (text: string) => {
      fallbackValue = text;
      return true;
    },
  });

  assert.equal(copied, true);
  assert.equal(fallbackValue, "usable prompt");
});

test("falls back when the browser Clipboard API rejects the write", async () => {
  assert.ok(copyModule, "copy helper should exist");
  const copied = await copyModule.copyText("usable prompt", {
    clipboard: { writeText: async () => { throw new Error("permission denied"); } },
    fallback: () => true,
  });

  assert.equal(copied, true);
});
