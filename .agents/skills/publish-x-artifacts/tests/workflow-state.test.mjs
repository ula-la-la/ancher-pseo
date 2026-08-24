import assert from "node:assert/strict";
import test from "node:test";

import { createJobState, transitionJob } from "../scripts/workflow-state.mjs";

test("creates a stable source-ready job identity", () => {
  const job = createJobState({ slug: "competitive-analysis", sourceHash: "abc123" });
  assert.equal(job.id, "competitive-analysis:abc123");
  assert.equal(job.state, "source_ready");
});

test("moves a generated artifact to pending review", () => {
  let job = createJobState({ slug: "competitive-analysis", sourceHash: "abc123" });
  job = transitionJob(job, "brief_ready");
  job = transitionJob(job, "generating");
  job = transitionJob(job, "pending_review", { artifactId: "artifact-1" });
  assert.equal(job.state, "pending_review");
  assert.equal(job.artifactId, "artifact-1");
});

test("cannot publicize an artifact before explicit approval", () => {
  const job = { ...createJobState({ slug: "competitive-analysis", sourceHash: "abc123" }), state: "pending_review" };
  assert.throws(() => transitionJob(job, "artifact_public"), /approved/);
});

test("cannot skip from source ready to review or deployment", () => {
  const job = createJobState({ slug: "competitive-analysis", sourceHash: "abc123" });
  assert.throws(() => transitionJob(job, "pending_review"), /Invalid transition/);
  assert.throws(() => transitionJob(job, "deployed"), /Invalid transition/);
});
