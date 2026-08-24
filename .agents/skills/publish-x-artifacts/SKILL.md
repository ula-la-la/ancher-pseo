---
name: publish-x-artifacts
description: Use when processing X-backed Ancher Gallery jobs, producing SEO/PSEO artifacts from saved X posts, preparing private Ancher artifacts for review, or publishing approved artifacts to ancher.us.
---

# Publish X Artifacts

Turn approved X sources into useful, text-first Ancher Artifacts, pause for human review, then publish only approved work to `ancher.us`.

## Non-negotiable rules

- Treat the saved X post as the content input, not merely as provenance.
- For the current 27 hidden jobs, use the existing single X URL and do not search for more sources.
- Do not invent a company, event, product, statistic, quotation, or current fact not present in the supplied source.
- Default to a substantive text deliverable for SEO. Do not turn it into a dashboard, workbench, or form unless the user explicitly approves that format.
- Generate privately, validate, and stop at `pending_review`. Approval of the workflow or batch is not approval of an individual Artifact.
- Never alter or regenerate the seven existing published Artifacts during this batch.

Read [artifact-contract.md](references/artifact-contract.md) before writing an Artifact. Read [review-contract.md](references/review-contract.md) before generation or approval. Read [website-contract.md](references/website-contract.md) before changing `ancher.us`.

## Workflow

1. From the repository root, list the hidden jobs:

   ```sh
   node --import tsx .agents/skills/publish-x-artifacts/scripts/list-hidden-jobs.mjs
   ```

2. Preserve Gallery order. Lock a brief containing the slug, supplied X source(s), audience, existing primary keyword, title, and text-first deliverable type. The first three current jobs are `competitive-analysis`, `research-report`, and `executive-summary`.
3. Send every supplied X URL to Ancher together. Ask for one self-contained HTML Artifact that follows the artifact contract. Keep it private.
4. Retrieve the generated HTML and validate it:

   ```sh
   node .agents/skills/publish-x-artifacts/scripts/validate-artifact.mjs artifact.html job.json
   ```

5. If validation fails, revise the private Artifact and rerun validation. If it passes, record `pending_review` and present the review packet. Stop and wait.
6. After explicit approval for that Artifact, make it public, capture its real product screenshot, and stage the matching Gallery page.
7. Run repository checks and show the staged website result. Deploy only after separate explicit deployment approval, then verify the live page, Artifact link, source link, sitemap, robots, and analytics.

## Batch behavior

Process jobs sequentially by default so review feedback can improve later items. Stable identity is `slug:sourceHash`; resume rather than duplicate. A future job may contain multiple approved X URLs, which must all be sent to Ancher and shown in the source trail. Source acquisition for jobs with no approved URLs is a separate workflow.

## Stop conditions

Stop when a source is missing, Ancher returns an inaccessible result, validation cannot pass without changing the evidence, or approval is unclear. Never interpret “start the batch” as permission to publicize or deploy.
