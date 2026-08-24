# Coworker operator runbook

Use this runbook only for `https://github.com/ula-la-la/ancher-pseo`. Do not apply it to `ancher.ai`, `app.ancher.ai`, or another repository.

## Access required

Ask the repository owner for these before starting:

- read/write access to `ula-la-la/ancher-pseo`;
- an Ancher account that can create, revise, and publish Artifacts;
- Cloudflare access only if responsible for production deployment;
- Node.js 22.13 or newer and npm.

Never commit passwords, cookies, API keys, Cloudflare tokens, RapidAPI keys, private Artifact HTML, or review-state JSON. Store private run files under `.artifacts/`, which is gitignored.

The current hidden jobs already contain approved X source data. Do not search X again or require Twitter/RapidAPI access for that batch. Future data collection is a separate pipeline task.

## Clone and verify

The handoff owner must name the release branch. For the current handoff, clone
`feature/x-to-ancher-publishing-workflow` explicitly. After it is merged, the
owner must update this line to `main`; coworkers must not guess which branch is
production-ready.

```bash
git clone --branch feature/x-to-ancher-publishing-workflow https://github.com/ula-la-la/ancher-pseo.git
cd ancher-pseo
npm install
npm run typecheck
npm run artifacts:test
```

In an Agent Skills-compatible coding agent, open this repository and say:

```text
Use $publish-x-artifacts. 開始執行剩餘 Artifact，先停在一次性人工審核。
```

The agent must read this Skill and its contracts. “開始執行” authorizes generation only through `pending_review`; it does not authorize publication or deployment.

If GitHub, Ancher, Cloudflare, GSC, GA4, or an approved X link is inaccessible
from the coworker’s network, stop and ask the company owner for the approved
access path or for an authorized operator to perform that external step. Do not
invent credentials or bypass company/network policy.

## Prepare the batch

```bash
mkdir -p .artifacts
npm run --silent artifacts:list-hidden > .artifacts/hidden-jobs.json
```

Do not assume that 27 jobs remain. The command derives the current hidden set from `galleryArtifacts.ts` and fails if a job has no approved X source.

For every selected job, preserve the approved `sources` array and create a private folder:

```text
.artifacts/<slug>-<sourceHash>/
  job.json
  artifact.html
  state.json
```

Add `editorialTitle` and any `disallowedTerms` to the private `job.json` after the brief is locked. Never publish these private workflow files.

When transferring an in-progress job to another coworker, the owner must send
the private folder through an approved internal channel. Its `state.json` must
contain `slug`, `sourceHash`, `state`, `artifactId`, `conversationId`,
`validationResult`, `reviewedAt`, `approvedAt`, and `approvedBy` when those
values exist. Missing approval evidence means stop at review; never infer it
from a public-looking URL.

## Generate and review

For each job:

1. Follow `artifact-contract.md` and lock the brief before opening Ancher.
2. In one Ancher conversation, provide every approved X URL in that job plus the locked brief. Keep the Artifact private.
3. Reuse the same Ancher conversation and Artifact identity for revisions.
4. Save the returned HTML to the job’s private `artifact.html`, then run:

```bash
node .agents/skills/publish-x-artifacts/scripts/validate-artifact.mjs \
  .artifacts/<slug>-<sourceHash>/artifact.html \
  .artifacts/<slug>-<sourceHash>/job.json
```

5. Build one combined review packet for the batch and stop at `pending_review`.

If the coworker cannot access Ancher, retrieve HTML, or keep the result private, stop. Repository access alone cannot grant Ancher product permissions.

## Publish approved Artifacts

Only after the owner explicitly approves the named Artifact batch:

1. Make each approved Artifact public in Ancher and record its public `.ancher.app` URL.
2. Capture the real public Artifact screenshot at a 1280 × 720 desktop viewport.
   Show the Artifact itself without browser chrome, internal controls, review
   labels, or private-state text. Keep the headline and useful first-screen
   content legible; use PNG or high-quality JPG.
3. Register it in `app/data/galleryArtifacts.ts` with `status: "published"`, its approved audience, public URL, screenshot path, and creation date.
4. Store the screenshot at `public/gallery-artifacts/<slug>.<ext>`.
5. Confirm the Gallery page uses the approved X source, source-derived title, public Artifact link, and real screenshot.
6. Apply `website-contract.md`, including Sitemap and `noindex` policy.

## Repository verification

```bash
npm run lint
npm run typecheck
npm run build
npm run artifacts:test
node --test test/search-index-policy.test.mjs \
  test/public-gallery-build.test.mjs \
  test/indexability-build.test.mjs \
  test/ga4-build.test.mjs
```

Review the generated `.next/server/app/sitemap.xml.body`. Prompt URLs must be absent until they satisfy the website contract.

Commit and push to a feature branch. Publication approval does not authorize deployment.

```bash
batch_name="approved-artifact-batch"
git switch -c "release/${batch_name}"
git status --short
git add app/data/gallery.ts app/data/galleryArtifacts.ts
git add public/gallery-artifacts/
git diff --cached --name-only
git commit -m "feat: publish approved Ancher Artifact batch"
git push -u origin HEAD
```

Before committing, compare `git diff --cached --name-only` with the approved
review packet. Unstage any unrelated file; never broaden the batch silently.

If already working on an owner-assigned release branch, omit `git switch -c`
and confirm `git status --short --branch` before committing. Open the pull
request or request review using the team’s GitHub process; merging is a separate
owner decision.

## Deploy and verify

After separate deployment approval and with the correct Cloudflare account:

```bash
npx wrangler login
npm run cf:deploy
```

Verify production:

- `https://ancher.us/` responds successfully;
- `https://ancher.us/sitemap.xml` contains only index-ready URLs;
- `https://ancher.us/robots.txt` points to the sitemap;
- every new `/templates/<slug>` page has `index, follow`;
- Prompt-library pages remain `noindex, follow` unless separately approved as index-ready;
- every X link, `.ancher.app` link, screenshot, canonical, mobile layout, and CTA works;
- GA4 Realtime receives a page view using measurement ID `G-DPX1LHWRG0`.

Submit or resubmit `https://ancher.us/sitemap.xml` in Google Search Console after production verification.
