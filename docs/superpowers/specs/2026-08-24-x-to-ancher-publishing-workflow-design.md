# X Sources → Ancher Artifact → ancher.us Publishing Workflow

Date: 2026-08-24  
Status: Approved through iterative product review

## Purpose

Build one repeatable, review-gated workflow that turns existing or newly sourced X posts into real Ancher HTML artifacts and publishes approved examples on `ancher.us`. The operator should eventually be able to say “開始執行這件事”; Codex then runs the workflow until a human review gate, waits for approval, and resumes without duplicating completed work.

## Confirmed Product Decisions

- Only `ancher.us` website code and content are modified. The workflow uses Ancher MCP and public `.ancher.app` artifacts but does not modify the `ancher.ai` or `app.ancher.ai` applications.
- The website CTA text is `Make your own with Ancher` and its destination is exactly `https://app.ancher.ai`.
- The seven artifacts already published on `ancher.us` are legacy examples. Their artifact HTML, footer copy, review language, and Ancher share pages are not regenerated or edited.
- New artifacts use the exact visible footer text `Design in ancher`. The text is not a link.
- The current 27 hidden Gallery items are the first batch. Each already has one unique X URL and directly usable prompt data.
- Multiple X sources are supported by the data model, but the workflow does not proactively search for supplemental posts for the current 27 items. A future sourcing run may select one primary post plus zero or more complementary posts when they concern the same event and add distinct useful evidence.
- A full Artifact is never embedded in an iframe on `ancher.us`. The website shows a screenshot of the actual Artifact and links to the public `.ancher.app` page.
- Every newly generated Artifact remains private until the user explicitly approves that particular Artifact.

## Product Surfaces

### Ancher Artifact

An Artifact is a standalone, self-contained HTML deliverable. Its information architecture and visual form vary by source, audience, and job to be done. A board dashboard, study guide, comparison, tracker, literature review, or content brief should look and behave like that deliverable; the workflow must not force every output into an article template.

Shared requirements for every new Artifact:

- Ground the content in the supplied X source set and any explicitly approved supporting sources.
- Preserve provenance for every X URL used.
- Use source media when it materially helps the deliverable.
- Clearly label illustrative inputs, placeholder values, or fabricated demonstration data.
- Do not present unsupported claims as verified facts.
- Produce responsive, readable, self-contained HTML.
- Include the exact unlinked footer text `Design in ancher`.
- While private, review-only UI may be shown outside the Artifact. The Artifact itself should be publication-ready and must not include `Private review`, `Manual review`, `Not for publication`, or equivalent internal workflow language.
- Do not include links to `ancher.ai`, `app.ancher.ai`, or `ancher.us` inside the Artifact footer.

### ancher.us Example Page

The website page is a standardized wrapper around the variable Artifact:

1. Real screenshot of the Artifact as the hero preview.
2. Link from the screenshot to the public `.ancher.app` page.
3. Output title, benefit-led description, output type, and target audience.
4. `Make your own with Ancher` CTA to `https://app.ancher.ai`.
5. Prompt and X source trail on the same horizontal row on desktop.
6. Prompt preview showing approximately three to four lines with internal scrolling for the full prompt.
7. One or more source cards containing author, date, media, excerpt, and the original X link.
8. “What you’ll get”, source requirements, and related examples using the existing accepted layout.
9. Mobile layout stacks the Prompt and Source regions without horizontal overflow.

The Prompt and Source regions start on the same horizontal line, use equal-width desktop columns, and must not create a large empty area. When there are multiple sources, the source list uses a fixed-height scroll or controlled switcher rather than extending the whole row indefinitely.

## Audience Routing

Every job maps to one or more of the six existing Ancher audiences:

- founder
- investor
- researcher
- creator
- product / product-growth
- consultant

The output format is selected from the actual source and audience need. The workflow must not default every job to a study guide or generic report.

## Source Model

The workflow unit is one Artifact job, not one Tweet:

```ts
type ArtifactSource = {
  tweetId: string;
  author: string;
  avatar: string;
  images: Array<{ src: string; alt: string }>;
  originalText: string;
  url: `https://x.com/${string}/status/${string}`;
  publishedAt: string;
  query?: string;
  role: "primary" | "supporting";
};

type ArtifactJob = {
  slug: string;
  promptTitle: string;
  promptBody: string;
  sources: [ArtifactSource, ...ArtifactSource[]];
  audiences: Array<"founder" | "investor" | "researcher" | "creator" | "product" | "consultant">;
  outputType: string;
  title: string;
  primaryKeyword: string;
  metaDescription: string;
};
```

Rules:

- `sources[0]` is the primary source.
- Tweet IDs and X URLs are unique within a job and across active Gallery jobs.
- A one-source job is represented as a one-element `sources` array.
- The existing `source` and `tweetId` fields remain valid for the seven legacy entries. Normalization helpers expose old and new records through arrays without rewriting the legacy data.
- Source hashing uses a stable serialization of slug, prompt text, source IDs, URLs, dates, original text, roles, and source media paths.

## X Sourcing Skill

The existing crawler already collects many candidates from Twitter241 Top and Latest results, deduplicates Tweet IDs, and retains up to 30 candidates per output target. Its instruction layer currently requires exactly one selected post per output type.

The revised contract is:

- Search and rank multiple candidates as today.
- Select exactly one primary source.
- Select zero or more supporting sources only when they concern the same event or output need and add distinct useful evidence.
- Do not add reposts, near-duplicate prompt copies, topic-only commentary, or unrelated high-engagement posts.
- Preserve all selected URLs, authors, dates, text, and media.
- If no supporting source qualifies, publish a valid one-source job.
- The current 27 jobs do not trigger additional X searches.

## Workflow States

Each job moves through:

```text
ready
→ sources_saved
→ sources_ready
→ generating
→ pending_review
→ approved
→ artifact_public
→ site_ready
→ site_published
```

Failure or revision states:

- `source_error`
- `generation_error`
- `needs_revision`
- `publication_error`
- `site_error`

The state store is local and ignored by Git. It may contain private Artifact IDs, conversation IDs, parsing status, errors, and timestamps. Public application data contains only approved public values.

Retries are idempotent by `(slug, sourceHash)`. Before any paid Ancher generation, the workflow checks for an existing private or public Artifact for the same key.

## Ancher MCP Sequence

For every source URL in the job:

1. Save the URL to Ancher as its own note so provenance is not flattened.
2. Wait until the note parsing state is ready; stop on a parsing error.
3. Start one Ancher generation conversation that explicitly lists the approved source set, target audience, output purpose, Artifact requirements, and factual constraints.
4. If Ancher requests clarification, continue the same conversation.
5. Resolve the generated Artifact and verify that it is private HTML with non-empty content.
6. Run the Artifact validator.
7. Record `pending_review` and present the review packet.

No call sets `is_public: true` before explicit approval for that Artifact.

## Artifact Validation

A new Artifact is eligible for review only when:

- It is HTML and non-empty.
- It has a title and responsive viewport metadata.
- It contains the exact text `Design in ancher`.
- That exact footer text is not inside an anchor.
- It does not contain the legacy phrase `Designed in Ancher`.
- It does not contain internal review/publication language.
- It contains or visibly cites every X URL in the approved source set.
- It does not contain an unapproved X URL.
- It does not put `ancher.ai`, `app.ancher.ai`, or `ancher.us` in its footer.
- Embedded images resolve.
- The selected output structure matches the job’s audience and purpose.

The validator excludes the seven legacy Artifact IDs and pages because they are intentionally frozen.

## Human Review Packet

The review gate shows:

- Job slug and title.
- Audience and output type.
- Primary keyword and meta description.
- Every X source URL, author, date, excerpt, and media preview.
- Private Artifact preview or owner-visible URL.
- Artifact screenshot.
- Automated validation results and warnings.
- Actions: approve, request revision, or reject.

Approval of the workflow, Skill, plan, or batch does not approve an individual Artifact.

## Publication Sequence

After explicit Artifact approval:

1. Set only that Artifact to public with Ancher MCP.
2. Verify `is_public`, `is_html`, and a non-null HTTPS `.ancher.app` `share_url`.
3. Open the share URL without relying on the owner-only preview.
4. Capture the real Artifact at a 1440 × 900 desktop viewport.
5. Store the screenshot under `public/gallery-artifacts/`.
6. Register the public Artifact, source hash, source IDs, audience, share URL, screenshot, and publication date in public application data.
7. Render and verify the local `ancher.us` page.
8. Run tests, typecheck, lint, and the production build.
9. Deploy Cloudflare only after the site batch is approved.
10. Verify the deployed page, Artifact URL, every X URL, screenshot, canonical metadata, sitemap membership, and indexability.

Only `published` registry entries are routed, linked, included in related content, and added to the sitemap.

## Repository and Distribution

The final source of truth is the `ula-la-la/ancher-pseo` repository. Repo-scoped Skills live under `.agents/skills/` so anyone who clones the repository and opens Codex within it receives the same workflow.

Structure:

```text
.agents/skills/
  sourcing-x-prompts/
  publish-x-artifacts/
```

`publish-x-artifacts` is the single operator-facing entry point and requires `sourcing-x-prompts` only when a job lacks approved X sources.

The current local `ancher-pseo` directory is an exported working tree without Git metadata. Implementation must occur in a proper local clone and feature branch. Nothing is pushed until local tests and the pilot review succeed.

## Team Operation

- One operator with Codex, repository access, Ancher MCP access, and deployment permission can run the workflow.
- Reviewers do not need a local checkout, RapidAPI key, or Cloudflare access; they review the packet and Artifact links.
- API keys and credentials remain per-user or in approved secret storage and are never committed.
- A future plugin or hosted runner may remove the operator’s local-repository requirement after the workflow is proven.

## Acceptance Criteria

The workflow implementation is ready for the 27-item run when:

1. The two repo-scoped Skills are discoverable and validate successfully.
2. Existing one-source Gallery data normalizes to `sources[]` without modifying the seven legacy Artifact records.
3. A fixture with multiple sources renders in the right-hand Source Trail without changing the one-source layout.
4. Prompt preview remains approximately three to four lines with internal scrolling.
5. The exact CTA points to `https://app.ancher.ai`.
6. Private workflow state cannot enter the public bundle.
7. The new Artifact validator catches footer links, legacy copy, internal review language, missing sources, and non-HTML output.
8. One hidden real job reaches `pending_review` through Ancher MCP without becoming public.
9. The user approves the pilot before any publication call.
10. After pilot approval, its public Artifact, real screenshot, source trail, SEO metadata, sitemap entry, and deployed page all verify successfully.

