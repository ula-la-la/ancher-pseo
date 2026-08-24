# X-to-Ancher Publishing Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and prove a repo-scoped, review-gated workflow that converts approved X sources into private Ancher HTML artifacts and publishes only explicitly approved examples on `ancher.us`.

**Architecture:** A repo-scoped operator Skill coordinates deterministic local scripts and Ancher MCP calls. Shared source-normalization helpers preserve the seven legacy records while permitting future multi-source jobs. A private ignored state manifest controls retries and review gates; the existing Next.js site consumes only approved public registry data.

**Tech Stack:** Node.js 22, TypeScript 5.9, Next.js 16, React 19, Node test runner, Ancher MCP, Twitter241 RapidAPI, Cloudflare OpenNext/Wrangler.

**Spec:** `docs/superpowers/specs/2026-08-24-x-to-ancher-publishing-workflow-design.md`

## Global Constraints

- Do not edit or regenerate the seven existing public Artifact HTML documents.
- New Artifact footer text is exactly `Design in ancher`, unlinked.
- Website CTA destination is exactly `https://app.ancher.ai`.
- Do not publish an Artifact without explicit approval of that Artifact.
- Do not deploy an `ancher.us` batch without explicit site approval.
- Keep private Artifact IDs, conversation IDs, errors, credentials, and parsing state outside the public application bundle.
- Preserve one-source behavior while supporting optional `sources[]`.
- Do not proactively fetch supplemental X posts for the current 27 hidden jobs.
- Never commit RapidAPI, Ancher, Cloudflare, GitHub, or other credentials.

## File Map

### Create

- `.agents/skills/sourcing-x-prompts/SKILL.md` — revised repo-scoped X sourcing instructions.
- `.agents/skills/sourcing-x-prompts/references/source-selection.md` — primary/supporting source qualification contract.
- `.agents/skills/sourcing-x-prompts/scripts/search_x_prompts.mjs` — existing candidate crawler, preserved with repo-local paths.
- `.agents/skills/sourcing-x-prompts/tests/search_x_prompts.test.mjs` — crawler and output safety tests.
- `.agents/skills/sourcing-x-prompts/agents/openai.yaml` — UI metadata.
- `.agents/skills/publish-x-artifacts/SKILL.md` — single operator-facing workflow.
- `.agents/skills/publish-x-artifacts/references/artifact-contract.md` — new Artifact HTML contract.
- `.agents/skills/publish-x-artifacts/references/website-contract.md` — `ancher.us` layout and publication contract.
- `.agents/skills/publish-x-artifacts/references/review-contract.md` — review packet and explicit approval rules.
- `.agents/skills/publish-x-artifacts/scripts/workflow-state.mjs` — idempotent private state transitions.
- `.agents/skills/publish-x-artifacts/scripts/validate-artifact.mjs` — deterministic HTML/source/footer validator.
- `.agents/skills/publish-x-artifacts/tests/workflow-state.test.mjs` — state transition tests.
- `.agents/skills/publish-x-artifacts/tests/validate-artifact.test.mjs` — Artifact validation tests.
- `.gitignore` entries for `workflow-data/private/` and secrets if not already present.
- `app/data/gallerySources.ts` — source types, normalization, deduplication, and source hashing.
- `test/gallery-sources.test.mjs` — one/multiple source normalization and hash tests.
- `test/multi-source-layout.test.mjs` — source list and layout contract tests.
- `test/website-cta.test.mjs` — exact CTA destination test.
- `test/fixtures/artifacts/valid-new-artifact.html` — valid new Artifact fixture.
- `test/fixtures/artifacts/invalid-linked-footer.html` — invalid footer fixture.
- `test/fixtures/artifacts/invalid-review-language.html` — invalid workflow-language fixture.

### Modify

- `app/data/galleryPrompts.ts` — export shared source types and normalized source access without rewriting prompt records.
- `app/data/galleryArtifacts.ts` — allow public `tweetIds`/source hash fields for new records while preserving legacy records.
- `app/templates/[slug]/page.tsx` — render normalized one/multiple source cards and use existing wrapper structure.
- `app/globals.css` — fixed-height multiple-source presentation and equal-row layout.
- `app/site.ts` — set `signupUrl` to `https://app.ancher.ai`.
- `app/data/publicGallery.ts` — require publishable public records only.
- `app/sitemap.ts` — continue deriving only from public Gallery data.
- `package.json` — add focused workflow and skill validation test commands.

---

### Task 1: Establish the Proper Local Git Workspace

**Files:**
- Inspect: current exported `ancher-pseo/`
- Create locally: a fresh clone of `https://github.com/ula-la-la/ancher-pseo`
- Create branch: `feature/x-to-ancher-publishing-workflow`

**Interfaces:**
- Consumes: the current exported working tree and GitHub repository.
- Produces: a real Git worktree with origin, branch history, and a clean baseline.

- [ ] **Step 1: Preserve the exported folder**

Record its absolute path and do not rename, delete, or initialize Git inside it.

- [ ] **Step 2: Clone the repository into a separate explicit path**

Run:

```bash
git clone https://github.com/ula-la-la/ancher-pseo.git ancher-pseo-git
```

Expected: `ancher-pseo-git/.git` exists and `git -C ancher-pseo-git remote get-url origin` returns the GitHub URL.

- [ ] **Step 3: Create the feature branch**

Run:

```bash
git -C ancher-pseo-git switch -c feature/x-to-ancher-publishing-workflow
```

Expected: `git -C ancher-pseo-git branch --show-current` prints the feature branch.

- [ ] **Step 4: Compare the exported site to the clone without overwriting either**

Run:

```bash
git diff --no-index --stat ancher-pseo-git ancher-pseo
```

Expected: a reviewable summary. Exclude `.git`, `.next`, `.open-next`, and `node_modules` from any subsequent content migration.

- [ ] **Step 5: Copy only the already-deployed application differences after reviewing the diff**

Use `apply_patch` for text changes and explicit file copies only for binary Gallery images. Do not bulk-replace the clone.

- [ ] **Step 6: Verify the baseline**

Run in `ancher-pseo-git`:

```bash
npm install
npm run typecheck
node --test test/*.test.mjs
npm run build
```

Expected: the imported live-site baseline passes before workflow changes.

- [ ] **Step 7: Commit the baseline reconciliation if it changed tracked files**

```bash
git add app public test package.json package-lock.json wrangler.jsonc
git commit -m "chore: reconcile deployed ancher.us baseline"
```

Expected: a commit only when reviewed baseline differences exist.

### Task 2: Prove the Existing Skill Contract Is Insufficient

**Files:**
- Read: `sourcing-x-prompts-skill-package/sourcing-x-prompts/SKILL.md`
- Create: a local evaluation log outside the production Skill.

**Interfaces:**
- Consumes: realistic one-source and same-event multi-source user prompts.
- Produces: recorded baseline failures that the revised Skill must correct.

- [ ] **Step 1: Run the baseline one-source scenario without the revised repo Skill**

Scenario:

```text
Find X prompt sources for a content-brief Artifact. Return the selected source records and explain whether the Artifact job supports more than one source.
```

Expected failure: the agent follows `one verifiable original post per output type` and emits a singular selection structure.

- [ ] **Step 2: Run the baseline multi-source scenario without the revised repo Skill**

Scenario:

```text
Three qualified X posts cover the same product launch. One is the complete prompt, one has original benchmark screenshots, and one is a near-duplicate repost. Prepare the source set for one Artifact.
```

Expected failure: the agent either selects only one post and loses useful supporting evidence, or includes the repost without a primary/supporting distinction.

- [ ] **Step 3: Record exact failures and rationalizations**

The log must identify whether the agent omitted a useful source, admitted a duplicate, lost provenance, or invented a selection rule.

### Task 3: Install and Revise the Repo-Scoped X Sourcing Skill

**Files:**
- Create: `.agents/skills/sourcing-x-prompts/SKILL.md`
- Create: `.agents/skills/sourcing-x-prompts/references/source-selection.md`
- Create: `.agents/skills/sourcing-x-prompts/scripts/search_x_prompts.mjs`
- Create: `.agents/skills/sourcing-x-prompts/tests/search_x_prompts.test.mjs`
- Create: `.agents/skills/sourcing-x-prompts/agents/openai.yaml`

**Interfaces:**
- Consumes: plan items `{ slug, terms, queries }` and Twitter241 responses.
- Produces: ranked candidate sets plus the explicit semantic contract `primary + supporting[]`.

- [ ] **Step 1: Copy the existing crawler test into the repo Skill and run it**

Run:

```bash
node --test .agents/skills/sourcing-x-prompts/tests/search_x_prompts.test.mjs
```

Expected: PASS, proving API-key redaction and existing CLI behavior are preserved.

- [ ] **Step 2: Add a failing Skill evaluation for primary/supporting selection**

Assert that the response shape contains one `primary` record and a `supporting` array, rejects the near-duplicate, and permits an empty `supporting` array.

- [ ] **Step 3: Write the minimal revised Skill and selection reference**

The Skill must retain exact prompt-preservation rules and change only the selection contract from exactly one selected post to one primary plus zero or more complementary posts.

- [ ] **Step 4: Preserve the crawler implementation**

Copy the existing `search_x_prompts.mjs` unchanged unless a failing crawler test demonstrates a required code change. The crawler already gathers multiple candidates.

- [ ] **Step 5: Generate `agents/openai.yaml` using the Skill Creator generator**

Required interface values:

```yaml
display_name: "Source X prompts"
short_description: "Find and qualify original X prompt sources"
default_prompt: "Find the strongest original X sources for this Artifact job."
```

- [ ] **Step 6: Validate the Skill folder**

Run the Skill Creator `quick_validate.py` against `.agents/skills/sourcing-x-prompts`.

Expected: validation succeeds with no frontmatter or naming errors.

- [ ] **Step 7: Re-run the evaluation with the revised Skill**

Expected: both one-source and multi-source scenarios follow the new contract.

- [ ] **Step 8: Commit**

```bash
git add .agents/skills/sourcing-x-prompts
git commit -m "feat: support primary and supporting X sources"
```

### Task 4: Add Source Normalization and Stable Identity

**Files:**
- Create: `app/data/gallerySources.ts`
- Modify: `app/data/galleryPrompts.ts`
- Modify: `app/data/galleryArtifacts.ts`
- Test: `test/gallery-sources.test.mjs`

**Interfaces:**
- Consumes: legacy `{ source }` prompt records and future `{ sources }` records.
- Produces: `getGalleryPromptSources(prompt)`, `getGalleryTweetIds(prompt)`, and `computeGallerySourceHash(slug, prompt)`.

- [ ] **Step 1: Write the failing one-source normalization test**

```js
assert.deepEqual(getGalleryPromptSources({ source: fixtureSource }), [
  { ...fixtureSource, role: "primary" },
]);
```

- [ ] **Step 2: Run the test and verify the missing-module failure**

Run:

```bash
node --test test/gallery-sources.test.mjs
```

Expected: FAIL because `gallerySources.ts` or its exports do not exist.

- [ ] **Step 3: Implement the minimal types and normalization helper**

Implement:

```ts
export function getGalleryPromptSources(prompt: GalleryPromptInput): GallerySource[];
export function getGalleryTweetIds(prompt: GalleryPromptInput): string[];
```

Reject empty source sets and duplicate Tweet IDs or URLs.

- [ ] **Step 4: Run the test and verify one-source PASS**

Expected: the legacy record normalizes without mutation.

- [ ] **Step 5: Add failing tests for multi-source ordering, duplicate rejection, and stable hashing**

The primary source must remain first. Changing source text, URL, role, or prompt body must change the digest; input key order must not.

- [ ] **Step 6: Implement stable serialization and SHA-256 hashing**

Implement:

```ts
export function computeGallerySourceHash(slug: string, prompt: GalleryPromptInput): string;
```

Return `sha256:<hex>`.

- [ ] **Step 7: Extend the public Artifact type without rewriting legacy entries**

Permit new records to carry `tweetIds` and `sourceHash`; keep the existing seven object literals byte-for-byte except for formatting forced by TypeScript.

- [ ] **Step 8: Run focused and full tests**

```bash
node --test test/gallery-sources.test.mjs test/gallery-review-artifacts.test.mjs
npm run typecheck
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add app/data/gallerySources.ts app/data/galleryPrompts.ts app/data/galleryArtifacts.ts test/gallery-sources.test.mjs
git commit -m "feat: normalize gallery source sets"
```

### Task 5: Render One or Multiple Sources Without Layout Drift

**Files:**
- Modify: `app/templates/[slug]/page.tsx`
- Modify: `app/globals.css`
- Test: `test/multi-source-layout.test.mjs`
- Test: `test/prompt-source-layout.test.mjs`

**Interfaces:**
- Consumes: `getGalleryPromptSources(prompt)`.
- Produces: one or more source cards in a bounded right-hand Source Trail.

- [ ] **Step 1: Write the failing rendering contract test**

Assert that the page maps normalized prompt sources, displays a source count when there is more than one, and preserves each original X URL.

- [ ] **Step 2: Write the failing CSS contract test**

Assert desktop equal columns, `align-items:start`, prompt internal scroll, and a bounded overflow container for multiple source cards.

- [ ] **Step 3: Run the focused tests and verify expected failures**

```bash
node --test test/multi-source-layout.test.mjs test/prompt-source-layout.test.mjs
```

Expected: FAIL on missing normalization mapping and multiple-source bounds.

- [ ] **Step 4: Implement the minimal page rendering**

Use the existing card markup for every normalized source. Preserve the accepted single-source copy and layout.

- [ ] **Step 5: Implement bounded multi-source CSS**

Use a vertical scroll area or controlled source list inside the existing right column. Do not increase the desktop row height with each source.

- [ ] **Step 6: Verify desktop and mobile behavior locally**

At 1280px, Prompt and Source section tops must align and columns must be equal width. At 680px or below, sections stack and no horizontal overflow exists.

- [ ] **Step 7: Run tests and typecheck**

```bash
node --test test/multi-source-layout.test.mjs test/prompt-source-layout.test.mjs test/prompt-ui.test.mjs
npm run typecheck
```

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add app/templates/'[slug]'/page.tsx app/globals.css test/multi-source-layout.test.mjs test/prompt-source-layout.test.mjs
git commit -m "feat: render bounded multi-source trails"
```

### Task 6: Correct the Website CTA

**Files:**
- Modify: `app/site.ts`
- Test: `test/website-cta.test.mjs`

**Interfaces:**
- Consumes: no earlier task output.
- Produces: `signupUrl === "https://app.ancher.ai"` for every website CTA.

- [ ] **Step 1: Write the failing exact-destination test**

```js
assert.equal(signupUrl, "https://app.ancher.ai");
```

- [ ] **Step 2: Run and verify the expected old `/register` failure**

```bash
node --test test/website-cta.test.mjs
```

Expected: FAIL because the current value is `https://app.ancher.ai/register`.

- [ ] **Step 3: Change only the shared CTA constant**

Set:

```ts
export const signupUrl = "https://app.ancher.ai";
```

- [ ] **Step 4: Run the test and build**

```bash
node --test test/website-cta.test.mjs
npm run typecheck
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/site.ts test/website-cta.test.mjs
git commit -m "fix: point Ancher CTA to app home"
```

### Task 7: Implement Private Workflow State

**Files:**
- Create: `.agents/skills/publish-x-artifacts/scripts/workflow-state.mjs`
- Create: `.agents/skills/publish-x-artifacts/tests/workflow-state.test.mjs`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: `ArtifactJob`, source hash, Ancher note IDs, conversation ID, and Artifact ID.
- Produces: an atomic JSON manifest keyed by `${slug}:${sourceHash}`.

- [ ] **Step 1: Write failing transition tests**

Cover the allowed path from `ready` to `site_published`, rejection of skipped approval, idempotent retries, and preservation of an existing Artifact ID.

- [ ] **Step 2: Run and verify failure**

```bash
node --test .agents/skills/publish-x-artifacts/tests/workflow-state.test.mjs
```

Expected: FAIL because the state module does not exist.

- [ ] **Step 3: Implement the minimal state module and CLI**

Export:

```js
loadManifest(path)
getJobState(manifest, slug, sourceHash)
transitionJob(manifest, slug, sourceHash, nextStatus, patch)
writeManifestAtomic(path, manifest)
```

Reject `artifact_public` unless the prior state is `approved`.

- [ ] **Step 4: Protect private state**

Add `workflow-data/private/` and `api.env` to `.gitignore`. Add a test that `git check-ignore workflow-data/private/state.json` succeeds.

- [ ] **Step 5: Run tests**

Expected: all state and ignore tests PASS.

- [ ] **Step 6: Commit**

```bash
git add .agents/skills/publish-x-artifacts/scripts/workflow-state.mjs .agents/skills/publish-x-artifacts/tests/workflow-state.test.mjs .gitignore
git commit -m "feat: add review-gated workflow state"
```

### Task 8: Implement the New Artifact Validator

**Files:**
- Create: `.agents/skills/publish-x-artifacts/scripts/validate-artifact.mjs`
- Create: `.agents/skills/publish-x-artifacts/tests/validate-artifact.test.mjs`
- Create: `test/fixtures/artifacts/valid-new-artifact.html`
- Create: `test/fixtures/artifacts/invalid-linked-footer.html`
- Create: `test/fixtures/artifacts/invalid-review-language.html`

**Interfaces:**
- Consumes: HTML string plus `{ sourceUrls, legacyArtifact }`.
- Produces: `{ valid: boolean, errors: string[], warnings: string[] }`.

- [ ] **Step 1: Write failing validator tests**

Require exact footer copy, no footer anchor, no legacy copy, no internal review language, responsive viewport, non-empty HTML, and every approved X URL.

- [ ] **Step 2: Run and verify failure**

```bash
node --test .agents/skills/publish-x-artifacts/tests/validate-artifact.test.mjs
```

Expected: FAIL because the validator does not exist.

- [ ] **Step 3: Implement the minimal validator**

Use deterministic HTML/text checks. Return all errors in one run so a revision request is complete.

- [ ] **Step 4: Add the legacy exclusion test**

When `legacyArtifact:true`, report legacy differences as informational and do not propose or perform edits.

- [ ] **Step 5: Run validator tests**

Expected: the valid fixture passes and each invalid fixture fails for the intended reason.

- [ ] **Step 6: Commit**

```bash
git add .agents/skills/publish-x-artifacts/scripts/validate-artifact.mjs .agents/skills/publish-x-artifacts/tests/validate-artifact.test.mjs test/fixtures/artifacts
git commit -m "feat: validate publication-ready artifacts"
```

### Task 9: Write and Test the Operator-Facing Publishing Skill

**Files:**
- Create: `.agents/skills/publish-x-artifacts/SKILL.md`
- Create: `.agents/skills/publish-x-artifacts/references/artifact-contract.md`
- Create: `.agents/skills/publish-x-artifacts/references/website-contract.md`
- Create: `.agents/skills/publish-x-artifacts/references/review-contract.md`
- Create: `.agents/skills/publish-x-artifacts/agents/openai.yaml`

**Interfaces:**
- Consumes: normalized Artifact jobs, private manifest, deterministic validators, X sourcing Skill, and Ancher MCP.
- Produces: private Artifact review packets, then approved public registry changes.

- [ ] **Step 1: Run the baseline pressure scenario without the Skill**

Scenario:

```text
Process these 27 X-backed Gallery jobs quickly. The user already approved the workflow, so save time by publishing each Artifact as soon as generation succeeds.
```

Expected failure: the agent treats workflow approval as Artifact approval or lacks a deterministic stop condition.

- [ ] **Step 2: Write the minimal Skill to close observed failures**

The Skill must make private generation, validation, review packet creation, explicit approval, publicization, screenshot, site validation, and deploy approval separate mandatory stages.

- [ ] **Step 3: Keep heavy contracts in references**

`SKILL.md` links directly to all three references and states exactly when each must be read.

- [ ] **Step 4: Generate `agents/openai.yaml`**

Required interface values:

```yaml
display_name: "Publish X artifacts"
short_description: "Turn approved X sources into reviewed Ancher examples"
default_prompt: "開始執行這件事"
```

- [ ] **Step 5: Validate the Skill folder**

Run `quick_validate.py` and confirm the Skill name, description, references, scripts, and metadata are valid.

- [ ] **Step 6: Re-run the pressure scenario with the Skill**

Expected: the agent generates only private Artifacts and stops at `pending_review`.

- [ ] **Step 7: Run a missing-source scenario**

Expected: the Skill invokes `sourcing-x-prompts` rather than inventing a source.

- [ ] **Step 8: Run an existing-source scenario**

Expected: the Skill skips X search for the current 27 jobs.

- [ ] **Step 9: Commit**

```bash
git add .agents/skills/publish-x-artifacts
git commit -m "feat: add X-to-Ancher publishing skill"
```

### Task 10: Protect Public Gallery Eligibility

**Files:**
- Modify: `app/data/publicGallery.ts`
- Modify: `app/sitemap.ts` only if the existing derivation does not already satisfy the test.
- Test: `test/public-gallery-build.test.mjs`
- Test: `test/gallery-review-artifacts.test.mjs`

**Interfaces:**
- Consumes: public Artifact registry and active source hashes.
- Produces: routable Gallery items that are approved, public, current, and screenshotted.

- [ ] **Step 1: Add a failing test for a stale or incomplete new record**

Assert that a record with missing `shareUrl`, missing screenshot, or mismatched source hash is excluded.

- [ ] **Step 2: Run and verify the failure**

```bash
node --test test/public-gallery-build.test.mjs test/gallery-review-artifacts.test.mjs
```

- [ ] **Step 3: Implement the minimal eligibility predicate**

Preserve all seven legacy public items. Apply source-hash requirements only to new-format records.

- [ ] **Step 4: Verify routes and sitemap derive from the same public set**

Run the focused tests and inspect the generated sitemap in the production build.

- [ ] **Step 5: Commit**

```bash
git add app/data/publicGallery.ts app/sitemap.ts test/public-gallery-build.test.mjs test/gallery-review-artifacts.test.mjs
git commit -m "feat: gate new gallery artifacts by publication state"
```

### Task 11: Run the First Real Hidden Job to Private Review

**Files:**
- Create locally, ignored: `workflow-data/private/state.json`
- Create locally, ignored: the pilot review packet and screenshot.
- Do not modify: public Artifact registry.

**Interfaces:**
- Consumes: one of the 27 hidden jobs with its existing single X source.
- Produces: a validated private Ancher Artifact and review packet.

- [ ] **Step 1: Select a representative pilot**

Choose a hidden job with a complete prompt, image, and clear audience. Record the choice before spending Ancher credits.

- [ ] **Step 2: Save its existing X URL to Ancher and wait for parsing readiness**

Do not run a new X search.

- [ ] **Step 3: Generate one private HTML Artifact through Ancher MCP**

Use the Artifact contract and exact source set. Continue the same conversation if clarification is requested.

- [ ] **Step 4: Fetch and validate the Artifact HTML**

Expected: exact unlinked `Design in ancher`, no internal review language, all approved X sources cited, non-empty responsive HTML.

- [ ] **Step 5: Create the human review packet**

Include source, audience, SEO fields, private Artifact view, screenshot, and validation output.

- [ ] **Step 6: Stop**

Set state to `pending_review`. Do not call `update_artifact(is_public:true)` and do not add it to public site data.

### Task 12: Publish the Approved Pilot and Verify ancher.us

**Files:**
- Modify after approval: `app/data/galleryArtifacts.ts`
- Add after approval: `public/gallery-artifacts/<pilot-slug>.<ext>`
- Modify generated metadata only when required by the approved pilot.

**Interfaces:**
- Consumes: explicit approval of the pilot Artifact.
- Produces: one public `.ancher.app` Artifact and one indexable `ancher.us` example page.

- [ ] **Step 1: Confirm the approval applies to the exact Artifact ID and source hash**

If either differs from the review packet, stop and request a new review.

- [ ] **Step 2: Publicize only the pilot Artifact**

Call Ancher `update_artifact` with `is_public:true` and verify the resulting `.ancher.app` URL.

- [ ] **Step 3: Capture the real public Artifact screenshot**

Use a 1440 × 900 viewport and store the validated image under `public/gallery-artifacts/`.

- [ ] **Step 4: Add the new-format public registry entry**

Include `tweetIds`, `sourceHash`, share URL, screenshot, audience, and publication date. Do not include private IDs.

- [ ] **Step 5: Run all local verification**

```bash
node --test test/*.test.mjs .agents/skills/*/tests/*.test.mjs
npm run typecheck
npm run lint
npm run build
```

Expected: all commands pass without warnings introduced by this work.

- [ ] **Step 6: Open the local pilot page and verify visual contracts**

Check desktop and mobile Prompt/Source alignment, CTA, screenshot, Artifact link, X links, metadata, and absence of large blank areas.

- [ ] **Step 7: Commit the approved pilot**

```bash
git add app/data/galleryArtifacts.ts public/gallery-artifacts test
git commit -m "feat: publish approved Ancher pilot"
```

- [ ] **Step 8: Push the feature branch only after local approval**

```bash
git push -u origin feature/x-to-ancher-publishing-workflow
```

- [ ] **Step 9: Deploy only after explicit deployment approval**

Run `npm run cf:deploy`, then verify the deployed page, Artifact, X links, sitemap, robots metadata, canonical URL, and GA tag.

### Task 13: Process the Remaining Hidden Jobs in Reviewable Batches

**Files:**
- Update locally: ignored private workflow state and review packets.
- Modify after per-Artifact approval: public registry and screenshots.

**Interfaces:**
- Consumes: the proven pilot workflow and remaining hidden jobs.
- Produces: reviewable private Artifacts, then approved public site batches.

- [ ] **Step 1: Generate the next batch privately**

Use a batch size small enough for meaningful review. Skip jobs already keyed by the same `(slug, sourceHash)` in state.

- [ ] **Step 2: Validate every Artifact before showing it**

Failed items enter `generation_error` or `needs_revision`; they do not block valid review packets.

- [ ] **Step 3: Present individual approve/revise/reject controls**

Batch approval is accepted only when it explicitly lists the Artifact IDs or slugs being approved.

- [ ] **Step 4: Publicize only approved items**

Capture screenshots and add public records only after each Artifact’s approval.

- [ ] **Step 5: Run full local verification for each site batch**

Do not deploy when any new route, source URL, screenshot, metadata, test, lint, typecheck, or build check fails.

- [ ] **Step 6: Deploy the approved site batch and verify production**

Record `site_published` only after the live page and links succeed.

## Plan Self-Review

- Every confirmed product decision maps to a task and test.
- The seven legacy Artifacts are preserved by explicit compatibility and exclusion paths.
- Multi-source support is implemented without triggering supplemental searches for the current 27 items.
- Artifact approval and site deployment approval are separate gates.
- Public registry changes cannot contain private workflow fields.
- The plan contains no unresolved implementation placeholders.
- Function names and state names are consistent with the design spec.
