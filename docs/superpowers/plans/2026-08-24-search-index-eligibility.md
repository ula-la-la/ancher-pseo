# Search Index Eligibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Advertise and index only the homepage, 12 completed Artifact pages, and 6 TA pages that contain completed Artifact cards; keep all 54 Prompt-library URLs accessible but non-indexable.

**Architecture:** The sitemap derives Artifact URLs from `publicGalleryItems` and TA URLs from use cases that have at least one public Artifact. Every Prompt-library route emits explicit `noindex, follow` metadata so omission from the sitemap and page-level indexing policy remain consistent.

**Tech Stack:** Next.js 16 App Router, TypeScript, Node.js built-in test runner.

**Spec:** User decision in the 2026-08-24 Codex thread: 12 completed Artifacts must be indexed; other pages are indexed only when they contain completed Artifact content.

## Global Constraints

- Keep all Prompt and TA routes publicly accessible.
- Do not delete Prompt data or future-page scaffolding.
- Sitemap must contain exactly the homepage, 12 published Artifact pages, and 6 qualifying TA pages.
- All 54 Prompt-library URLs must emit `noindex, follow` when site-wide indexing is enabled.
- All 6 TA pages must contain at least one public Artifact card before they are eligible.

---

### Task 1: Lock the index policy with production-build tests

**Files:**
- Create: `test/search-index-policy.test.mjs`

**Interfaces:**
- Consumes: Next.js output under `.next/server/app`.
- Produces: Regression coverage for sitemap membership and robots metadata.

- [ ] **Step 1: Write a failing build-output test**

Assert that the sitemap has 19 URLs, contains the 12 approved `/templates/` routes and all 6 `/for/` routes, contains no `/prompts` routes, every Prompt page family emits `noindex, follow`, and every TA page emits `index, follow` while linking at least one Artifact page.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test test/search-index-policy.test.mjs`

Expected: FAIL because the current sitemap contains Prompt URLs and Prompt pages are indexable.

### Task 2: Implement content-gated sitemap and robots metadata

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/prompts/page.tsx`
- Modify: `app/prompts/[slug]/page.tsx`
- Modify: `app/prompts/pack/[pack]/page.tsx`
- Modify: `app/prompts/source/[source]/page.tsx`
- Modify: `app/prompts/output/[output]/page.tsx`
- Modify: `app/for/[useCase]/page.tsx`

**Interfaces:**
- Consumes: `publicGalleryItems`, `useCases`, `useCasesBySlug`, and global `indexable`.
- Produces: Sitemap entries and page-level robots metadata consistent with completed Artifact coverage.

- [ ] **Step 1: Remove all Prompt-library URL families from the sitemap**

Keep the routes and navigation intact; only stop advertising them to search engines.

- [ ] **Step 2: Gate TA sitemap entries on at least one public Artifact**

For each use case, include `/for/<slug>` only if `publicGalleryItems` contains an item mapped to that use case.

- [ ] **Step 3: Add explicit Prompt-library noindex metadata**

Use `{ index: false, follow: indexable }` for the Prompt index, details, packs, source pages, and output pages.

- [ ] **Step 4: Add explicit TA eligibility metadata**

Use `{ index: indexable && hasPublicArtifact, follow: indexable }` based on the same public-Artifact relation used by the sitemap.

- [ ] **Step 5: Rebuild and run verification**

Run: `npm run build && node --test test/search-index-policy.test.mjs test/public-gallery-build.test.mjs test/indexability-build.test.mjs`

Expected: PASS with 19 sitemap URLs, 12 indexed Artifact pages, 6 indexed TA pages, and all Prompt pages non-indexed.

