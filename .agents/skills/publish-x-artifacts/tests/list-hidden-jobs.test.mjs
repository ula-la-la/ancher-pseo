import assert from "node:assert/strict";
import test from "node:test";

import { listHiddenJobs } from "../scripts/list-hidden-jobs.mjs";

test("derives exactly 22 remaining hidden X-backed jobs in gallery order", async () => {
  const jobs = await listHiddenJobs(process.cwd());
  assert.equal(jobs.length, 22);
  assert.deepEqual(jobs.slice(0, 3).map((job) => job.slug), [
    "competitive-analysis",
    "startup-pitch-deck",
    "case-study",
  ]);
});

test("preserves one existing X source and SEO fields for every current hidden job", async () => {
  const jobs = await listHiddenJobs(process.cwd());
  for (const job of jobs) {
    assert.match(job.primaryKeyword, /\S/);
    assert.match(job.metaDescription, /\S/);
    assert.ok(job.audiences.length > 0, `${job.slug} should have an audience`);
    assert.equal(job.sources.length, 1, `${job.slug} should keep its existing single source`);
    assert.match(job.sources[0].url, /^https:\/\/x\.com\/.+\/status\/\d+$/);
    assert.equal(job.sources[0].tweetId, job.sources[0].url.split("/").at(-1));
  }
});
