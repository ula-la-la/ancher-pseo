# Correct Five X Artifacts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the repo-scoped publishing Skill, regenerate five source-faithful private Ancher HTML Artifacts, and present one five-item review packet before publication.

**Architecture:** The repo Skill defines the editorial contract; a deterministic validator enforces machine-checkable rules; Ancher MCP performs source-grounded HTML generation; local private state keeps generation idempotent. The public site remains unchanged until the user approves all five private Artifacts.

**Tech Stack:** Markdown Skills, Node.js ESM, Node test runner, TypeScript/Next.js, Ancher MCP, Cloudflare deployment workflow

**Spec:** `docs/superpowers/specs/2026-08-24-x-to-ancher-publishing-workflow-design.md`

## Global Constraints

- Treat approved X posts as content input, not inspiration for fictional examples.
- Permit supported synthesis and new insights, but never invent missing entities, events, projects, books, meetings, quotations, or metrics.
- Preserve source placeholders when the source provides no concrete value.
- Use a specific source-derived editorial headline; do not default to sample/example/template framing.
- Do not put X URLs, Source Trail, Prompt Inspiration, or website SEO wrapper copy inside an Artifact.
- End with exactly one quiet `Design in ancher` link to `https://app.ancher.ai`.
- Keep all five Artifacts private until the user approves the complete five-item review packet.
- Do not modify the seven currently public Artifact pages during private generation.

---

### Task 1: Encode the corrected Artifact contract in failing tests

**Files:**
- Modify: `.agents/skills/publish-x-artifacts/tests/validate-artifact.test.mjs`
- Test: `.agents/skills/publish-x-artifacts/tests/validate-artifact.test.mjs`

**Interfaces:**
- Consumes: `validateArtifact({ html, job })`
- Produces: failing assertions for the new source-faithful HTML contract

- [ ] **Step 1: Replace the legacy valid fixture with a source-derived Artifact**

The valid HTML must use a concrete editorial title, contain source-faithful content, omit X URLs, and finish with:

```html
<footer><a href="https://app.ancher.ai">Design in ancher</a></footer>
```

- [ ] **Step 2: Add failing tests for prohibited example framing and source UI**

```js
test("rejects invented example framing and source UI inside the Artifact", () => {
  const invalid = validHtml()
    .replace("<main>", "<main><p>Illustrative example</p><h2>Source Trail</h2>")
    .replace("</main>", `<a href="${sourceUrl}">Original X post</a></main>`);
  const codes = validateArtifact({ html: invalid, job }).map(({ code }) => code);
  assert.ok(codes.includes("example-framing"));
  assert.ok(codes.includes("artifact-source-ui"));
});
```

- [ ] **Step 3: Add failing tests for footer, generic title, and invented entities**

The tests must expect `footer-link`, `generic-title`, and `invented-entity` codes. The job fixture carries `sourceText`, `sourceEntities`, and `editorialTitle`.

- [ ] **Step 4: Run the validator tests and verify RED**

Run: `node --test .agents/skills/publish-x-artifacts/tests/validate-artifact.test.mjs`

Expected: FAIL because the current validator requires visible X URLs, an unlinked footer, SEO keywords in title/H1, and 700 words.

---

### Task 2: Implement the validator and Skill contract

**Files:**
- Modify: `.agents/skills/publish-x-artifacts/scripts/validate-artifact.mjs`
- Modify: `.agents/skills/publish-x-artifacts/SKILL.md`
- Modify: `.agents/skills/publish-x-artifacts/references/artifact-contract.md`
- Modify: `.agents/skills/publish-x-artifacts/references/review-contract.md`
- Modify: `.agents/skills/publish-x-artifacts/references/website-contract.md`
- Modify: `.agents/skills/publish-x-artifacts/agents/openai.yaml`
- Test: `.agents/skills/publish-x-artifacts/tests/validate-artifact.test.mjs`

**Interfaces:**
- Consumes: Artifact HTML and a job with `editorialTitle`, `sourceText`, `sourceEntities`, and `sources`
- Produces: deterministic validation errors and an operator Skill triggered by “開始執行”

- [ ] **Step 1: Remove obsolete validator rules**

Delete the 700-word minimum, forced primary keyword in HTML title/H1, visible X URL requirement, unlinked-footer rule, and blanket Ancher-domain rejection.

- [ ] **Step 2: Implement the corrected rules**

Require the editorial title in `<title>` and `<h1>`; reject generic title patterns, example/sample/illustrative framing, internal workflow language, Artifact source UI, unapproved invented entities, and an incorrect footer link.

- [ ] **Step 3: Rewrite the Artifact contract as a positive recipe**

Define the output in this order: source purpose → source-derived editorial headline → preserved content and placeholders → supported synthesis/insights → fitting HTML structure → small linked footer. State explicitly that Ancher.us owns SEO metadata and X provenance UI.

- [ ] **Step 4: Update review and publication behavior**

Make the next five a single review packet and keep publication/deployment as later explicit steps.

- [ ] **Step 5: Update Skill discovery metadata**

Set `default_prompt` to run the complete source-to-review workflow and mention both Chinese and English trigger language in the Skill description.

- [ ] **Step 6: Run validator tests and verify GREEN**

Run: `node --test .agents/skills/publish-x-artifacts/tests/validate-artifact.test.mjs`

Expected: PASS.

- [ ] **Step 7: Commit the corrected Skill**

```bash
git add .agents/skills/publish-x-artifacts
git commit -m "fix: make X artifact generation source faithful"
```

---

### Task 3: Validate the Skill package with baseline and forward scenarios

**Files:**
- Modify: `docs/superpowers/evals/2026-08-24-publish-x-artifacts-baseline.md`
- Create: `docs/superpowers/evals/2026-08-24-publish-x-artifacts-source-fidelity.md`

**Interfaces:**
- Consumes: raw X fixtures for a placeholder-only prompt, a concrete post, and a multi-source topic
- Produces: evidence that agents preserve placeholders, avoid fiction, derive editorial titles, and combine only qualified sources

- [ ] **Step 1: Run a no-Skill baseline pressure scenario**

Use a fresh agent with the PRD X post and ask for an Artifact under time pressure. Record whether it invents a project, adds “Illustrative example,” or writes a generic SEO article.

- [ ] **Step 2: Run the same scenario with the revised Skill**

Expected: it proposes a source-derived HTML Artifact, preserves `[project name]`, and refuses fictional filler.

- [ ] **Step 3: Run a multi-source scenario**

Expected: one primary plus only distinct supporting posts; the Artifact may synthesize insights but keeps all claims source-grounded.

- [ ] **Step 4: Validate the Skill folder**

Run:

```bash
python3 /Users/liyunting/.codex/skills/.system/skill-creator/scripts/quick_validate.py .agents/skills/publish-x-artifacts
```

Expected: validation succeeds.

- [ ] **Step 5: Commit evaluation evidence**

```bash
git add docs/superpowers/evals
git commit -m "test: verify source-faithful artifact workflow"
```

---

### Task 4: Regenerate the five private Artifacts in place

**Files:**
- Modify: ignored private workflow state under `.artifacts/workflow/`
- Do not modify public Gallery application data

**Interfaces:**
- Consumes: the exact existing X records for `research-report`, `executive-summary`, `project-status-report`, `product-requirements-document`, and `meeting-notes`
- Produces: five corrected private Ancher HTML Artifacts and their conversation IDs

- [ ] **Step 1: Lock source-derived briefs**

Use these editorial directions:

- Research: the leaked Gemini research-report editor prompt and its two response modes.
- Executive summary: the exact book/author/industry executive-summary prompt with placeholders preserved.
- Project status: the six-field weekly project status structure with `[project name]` preserved.
- PRD: the exact MVP scope prompt with P0/P1/P2, complexity, journey mapping, and `[project name]` preserved.
- Meeting notes: the exact under-200-word meeting-summary prompt with transcript placeholders preserved.

- [ ] **Step 2: Revise the five existing private Artifact conversations**

Reuse the existing Artifact/conversation identities where possible. Instruct Ancher to replace the fictional content entirely, preserve source purpose, use a source-derived editorial title, omit source UI, and keep the Artifact private.

- [ ] **Step 3: Retrieve and validate each Artifact**

Run the deterministic validator against the resolved HTML and its locked job brief. Continue the same conversation for corrections; do not create silent duplicates.

- [ ] **Step 4: Record all five as `pending_review`**

Store Artifact ID, conversation ID, source hash, validation result, and timestamp only in ignored private workflow state.

---

### Task 5: Present one five-Artifact review packet

**Files:**
- No public application changes

**Interfaces:**
- Consumes: five validated private Artifacts
- Produces: one reviewer-facing list with titles, private links, exact X sources, format summaries, and validator status

- [ ] **Step 1: Verify all five remain private**

Call Ancher metadata reads and confirm `is_public === false` and `is_html === true`.

- [ ] **Step 2: Present all five together**

Stop after presenting the private links. Do not publish, screenshot for the public Gallery, modify sitemap data, deploy Cloudflare, or push website changes before explicit batch approval.

---

### Task 6: Publish and deploy after later batch approval

**Files:**
- Modify after approval: `app/data/galleryArtifacts.ts`
- Modify after approval: matching Gallery metadata in `app/data/gallery.ts`
- Create after approval: five files under `public/gallery-artifacts/`
- Test after approval: public Gallery, sitemap, SEO, GA4, source-link, and build tests

**Interfaces:**
- Consumes: explicit approval of the exact five-Artifact packet
- Produces: twelve public Gallery Artifacts on `ancher.us`

- [ ] **Step 1: Publish exactly the approved five Artifacts**

- [ ] **Step 2: Capture their real public screenshots**

- [ ] **Step 3: Register source-derived titles, share URLs, screenshots, and source hashes**

- [ ] **Step 4: Run tests, typecheck, lint, and production build**

- [ ] **Step 5: Request deployment approval immediately before Cloudflare deployment**

- [ ] **Step 6: Deploy and verify all twelve live entries**

