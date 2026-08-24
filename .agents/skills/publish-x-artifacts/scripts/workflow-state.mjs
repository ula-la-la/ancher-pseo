const transitions = {
  source_ready: new Set(["brief_ready"]),
  brief_ready: new Set(["generating"]),
  generating: new Set(["pending_review", "generation_error"]),
  generation_error: new Set(["generating"]),
  pending_review: new Set(["approved", "needs_revision"]),
  needs_revision: new Set(["generating"]),
  approved: new Set(["artifact_public"]),
  artifact_public: new Set(["site_staged"]),
  site_staged: new Set(["deploy_approved"]),
  deploy_approved: new Set(["deployed"]),
  deployed: new Set(["verified"]),
  verified: new Set(),
};

export function createJobState({ slug, sourceHash }) {
  if (!slug || !sourceHash) throw new Error("slug and sourceHash are required");
  return {
    id: `${slug}:${sourceHash}`,
    slug,
    sourceHash,
    state: "source_ready",
  };
}

export function transitionJob(job, nextState, fields = {}) {
  if (nextState === "artifact_public" && job.state !== "approved") {
    throw new Error("Artifact must be approved before artifact_public");
  }
  if (!transitions[job.state]?.has(nextState)) {
    throw new Error(`Invalid transition: ${job.state} -> ${nextState}`);
  }
  if (nextState === "pending_review" && !(fields.artifactId ?? job.artifactId)) {
    throw new Error("pending_review requires artifactId");
  }
  return { ...job, ...fields, state: nextState };
}
