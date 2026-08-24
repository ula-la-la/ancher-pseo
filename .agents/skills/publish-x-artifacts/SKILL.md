---
name: publish-x-artifacts
description: Use when an approved X post or source set must become an Ancher HTML Artifact, an Artifact review packet is needed, or approved Artifacts must be published to ancher.us; including “開始執行” and “开始执行” requests.
---

# Publish X Artifacts

## Core principle

Treat X as the content and evidence input. Produce a finished HTML Artifact whose purpose, headline, detail, and useful insights are traceable to the approved source set. Do not turn the source into a fictional example, generic SEO article, or template showcase.

Read [artifact-contract.md](references/artifact-contract.md) before generation, [review-contract.md](references/review-contract.md) before review or publication, and [website-contract.md](references/website-contract.md) before changing ancher.us.

## Run the workflow

1. List hidden jobs in Gallery order with:

       node --import tsx .agents/skills/publish-x-artifacts/scripts/list-hidden-jobs.mjs

2. Use the job’s approved X source set. The current hidden jobs already have one source each; do not search for extras. Future sourced jobs may use one primary plus distinct supporting posts about the same purpose, event, company, product, or question.
3. Lock a generation brief containing:
   - source purpose and audience;
   - exact claims, entities, numbers, constraints, media, and placeholders;
   - only supplied source metadata; mark missing author, date, or media as unavailable instead of deriving or guessing it;
   - supported insights or cross-source synthesis;
   - one specific editorial headline derived from the content;
   - fitting HTML structure;
   - disallowed invented terms from any rejected revision.
4. Send every approved X URL and the locked brief to Ancher in one conversation. State explicitly that source content is the Artifact’s core, not inspiration for a fictional scenario.
5. Keep the Artifact private. Retrieve and validate its HTML with:

       node .agents/skills/publish-x-artifacts/scripts/validate-artifact.mjs artifact.html job.json

6. Fix failures in the same conversation and Artifact identity. Record pending_review; do not silently duplicate.
7. Present the required review packet and stop. For the current five, present one combined packet.
8. Only after explicit approval, publish the approved Artifact set, capture real Artifact screenshots, register the examples, run repository checks, request deployment approval, deploy, and verify production.

## Output recipe

The Artifact is:

1. a source-derived editorial headline;
2. the source’s actual purpose and useful content;
3. preserved placeholders where inputs are missing;
4. supported synthesis, implications, or new insight when the source set permits it;
5. a readable, responsive web structure selected for that content;
6. exactly one quiet footer link: Design in ancher → https://app.ancher.ai.

Ancher.us—not the Artifact—owns X source cards, Prompt/Source layout, SEO metadata, Gallery copy, screenshots, and the main CTA.

## Stop conditions

Stop on a missing source, inaccessible Ancher result, unresolved factual gap, failed validation, unclear approval, or failed production check. “Start” authorizes work through the review gate, not publication or deployment.

## Common mistakes

| Mistake | Correct behavior |
|---|---|
| Add “Illustrative example,” a sample company, or invented metrics | Preserve source content and placeholders |
| Summarize the post into a generic article | Build the deliverable implied by the post’s purpose |
| Force the Gallery keyword into Artifact title/H1 | Keep SEO on Ancher.us; use a source-derived headline |
| Put Source Trail or X links inside the Artifact | Show provenance on Ancher.us and in the review packet |
| Pad to a fixed word count | Use only the detail the source and supported insight justify |
| Generate a new Artifact after feedback | Revise the existing private Artifact/conversation |
