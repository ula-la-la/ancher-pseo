# Gallery → Ancher Artifact Pipeline Design

Date: 2026-08-21
Status: Approved in chat; awaiting final written-spec review

## Purpose

Every X post formally imported into the `ancher.us` Gallery must lead to a real product output, not only a prompt preview. Ancher MCP generates a private HTML artifact from the imported post and prompt. A human reviews it before publication. Once approved, the artifact becomes public, its stable share URL is registered, and a screenshot of the live Ancher output replaces the X image as the Gallery preview.

The first end-to-end pilot is `study-guide`. The remaining Gallery posts are processed only after the pilot's output and presentation are approved.

## Scope

In scope:

- Generate one Ancher HTML artifact for each X post formally included in `galleryPrompts`.
- Keep newly generated artifacts private until explicit human approval.
- Register approved public artifact links and screenshots in `ancher.us`.
- Use the Ancher product screenshot as the Gallery card and template hero image.
- Retain the original prompt, X author, post media, and original X link as provenance.
- Detect when a prompt or source changes and prevent a stale artifact from being shown.
- Establish a repeatable MCP-operated workflow that can later become automated.

Out of scope for the pilot:

- An `ancher.us` admin dashboard.
- Automatic artifact publication.
- Embedding the full artifact in an iframe.
- Batch-generating all Gallery artifacts before the Study Guide pilot is approved.
- Storing an Ancher API token in the website repository or browser bundle.

## Architecture

The first version is an MCP-operated, review-gated static publishing pipeline.

1. The reviewed X post and directly usable prompt live in `app/data/galleryPrompts.ts` or `galleryPromptAdditions.ts`.
2. Codex sends the post URL, original post text, usable prompt, template context, and output requirements to `mcp__ancher__ask`.
3. Ancher produces a private HTML artifact. The operator verifies it with `get_artifact` and `get_artifact_content`.
4. Private review state is stored outside the public application data and is never imported by a browser component.
5. The human reviews the output in Codex/local preview.
6. Only after explicit approval does the operator call `update_artifact(is_public: true)`.
7. The operator verifies `is_html: true` and a non-null HTTPS `share_url`.
8. A browser captures the published artifact at a fixed desktop viewport. The screenshot is stored under `public/gallery-artifacts/`.
9. The public artifact registry is updated and `ancher.us` renders the screenshot and share link.

No step touches or modifies `app.ancher.ai`. The MCP and artifact share service are the Ancher product surfaces used by this workflow.

## Data Boundaries

### Private review manifest

Private operator state belongs in a local, ignored manifest such as:

`data/private/gallery-artifact-reviews.json`

It must not be imported by application code or committed to the public repository. Each record contains:

```json
{
  "slug": "study-guide",
  "tweetId": "1998334446379188696",
  "sourceHash": "sha256:...",
  "artifactId": "private-artifact-id",
  "conversationId": "ancher-conversation-id",
  "status": "pending_review",
  "generatedAt": "2026-08-21T00:00:00.000Z",
  "error": null
}
```

Allowed private statuses are:

- `generating`
- `pending_review`
- `approved`
- `failed`

### Public artifact registry

Only approved, fully publishable data goes into application data, for example `app/data/galleryArtifacts.ts`:

```ts
{
  slug: "study-guide",
  tweetId: "1998334446379188696",
  sourceHash: "sha256:...",
  status: "published",
  shareUrl: "https://<artifact-slug>.ancher.app",
  screenshot: "/gallery-artifacts/study-guide.png",
  publishedAt: "2026-08-21T00:00:00.000Z"
}
```

The public registry never contains the private artifact ID, conversation ID, credentials, presigned URLs, or error details.

## Source Identity and Invalidation

`sourceHash` is a SHA-256 digest of a stable serialization of:

- Gallery slug
- Tweet ID
- Original X URL
- Original post text
- Directly usable prompt body
- Source publication date

The frontend considers a published artifact current only when its `sourceHash` matches the active Gallery prompt. If any source field changes, the artifact is treated as unavailable until a replacement is generated, reviewed, published, and screenshotted.

## Ancher Generation Contract

The MCP request must ask Ancher to create a self-contained HTML deliverable, not an explanation of how to create one. It includes:

- The original X post URL and author.
- The exact prompt copied from the post.
- The Gallery template title and output type.
- The requested output structure from `item.included`.
- An instruction to create a polished, usable product artifact grounded in the supplied source and clearly marked example inputs where the original post contains placeholders.
- An instruction not to invent private facts or present placeholder data as verified truth.

If `ask` returns `clarification_requested`, the same conversation is continued. A new generation must not be started until the clarification is resolved.

The generated result is eligible for review only when:

- An artifact can be identified from the Ancher response or most recent artifacts.
- `get_artifact` reports `is_html: true` and an HTML MIME type.
- `get_artifact_content` returns non-empty HTML.
- The artifact remains private.

## Human Review Gate

The first implementation deliberately stops after creating the private Study Guide artifact. The reviewer receives:

- Artifact name and generation timestamp.
- A local/private rendering or screenshot of the HTML.
- The exact source X post and prompt used.
- Any generation warnings or unresolved placeholders.

Publication requires an explicit approval message after this review. Approval of the architecture or the generation run does not count as approval to publish the particular artifact.

After approval, the operator:

1. Calls `update_artifact` with `is_public: true`.
2. Fetches the artifact again and verifies `is_public`, `is_html`, and `share_url`.
3. Opens the public share URL and verifies it renders without authentication.
4. Captures and validates the screenshot.
5. Adds the public registry record.

## Screenshot Contract

The Gallery image must be a screenshot of the actual published Ancher artifact, not the X post image and not a synthetic mockup.

- Capture target: the artifact's public `share_url`.
- Default desktop viewport: 1440 × 900.
- Primary image: the artifact's above-the-fold product view, cropped consistently for Gallery use.
- Format: PNG or WebP.
- Public path: `/gallery-artifacts/<slug>.<ext>`.
- The screenshot must be non-empty, readable, and associated with the same source hash as the registered artifact.

If screenshot capture fails, the artifact may remain public in Ancher after approval, but it is not added to the `ancher.us` public registry until a valid screenshot exists.

## Frontend Presentation

### Gallery cards

For a current published artifact:

- Use the Ancher artifact screenshot as the primary image.
- Show a `Generated with Ancher` label.
- Keep the card link pointed at `/templates/<slug>`.

For an unpublished, stale, or invalid artifact:

- Do not show a private link or stale screenshot.
- Fall back to the existing non-artifact template presentation.

### Template detail page

For a current published artifact:

- Show the larger Ancher artifact screenshot in the hero.
- Make the screenshot link to `shareUrl` in a new tab.
- Add a visible `View live Ancher output ↗` action using the same URL.
- Describe it as a finished Ancher output.

Below the product output, retain a separate provenance section containing:

- The reusable prompt.
- Original X author and publication date.
- Original X post media.
- Direct original X link.

The first version does not use an iframe. This avoids cross-origin policy, responsive-height, performance, and third-party availability issues while preserving access to the complete live output.

## Failure Handling

- MCP generation failure: record `failed` privately; do not change public data.
- Clarification requested: continue the same conversation; do not create duplicates.
- Non-HTML artifact: fail review eligibility.
- Empty artifact content: fail review eligibility.
- Rejected review: leave artifact private and generate a revision or replacement only when requested.
- Publication without `share_url`: do not register publicly.
- Public URL authentication or load failure: do not register publicly.
- Screenshot failure: do not register publicly.
- Source hash mismatch: hide the existing artifact and queue regeneration.
- Build or test failure: do not deploy the registry change.

Retries are idempotent by `(slug, tweetId, sourceHash)`. The operator checks the private manifest before starting another paid generation.

## Testing Strategy

### Unit tests

- Stable source hashing produces the expected digest for a fixed fixture.
- A changed prompt or X source invalidates the published artifact.
- Only `published` records with matching source hashes, HTTPS share URLs, and valid screenshot paths are eligible for display.
- Private review fields cannot enter the public artifact type.
- Every published registry slug exists in the Gallery prompt data and has the same tweet ID.

### Component and page tests

- A published template card uses the Ancher screenshot and `Generated with Ancher` label.
- The detail page renders the screenshot link and `View live Ancher output` action.
- The X prompt and provenance remain visible separately.
- Pending, failed, or stale records do not expose a live-output link.

### Build verification

- Targeted lint and TypeScript checks pass.
- Existing unit tests pass.
- Next.js production build succeeds.
- Generated Study Guide HTML contains the current artifact screenshot and public link and does not contain private identifiers.

## Pilot Acceptance Criteria

The Study Guide pilot is complete when:

1. Its reviewed X post is the source of the generation request.
2. Ancher produces a private HTML artifact.
3. The artifact is shown to the user while private.
4. The user explicitly approves that artifact for publication.
5. The public artifact URL works without authentication.
6. The captured image is visibly a screenshot of that live artifact.
7. The localhost Gallery card and Study Guide page display the screenshot.
8. The screenshot and `View live Ancher output` action open the correct artifact.
9. Original X provenance remains present.
10. Tests, type checks, and production build pass.

## Future Automation

After the pilot and several manual runs establish a stable generation contract, automation may move generation and review state into a protected service or database. Automatic publication remains a separate opt-in change. It must preserve the source hash, validation, screenshot, and rollback rules defined here.
