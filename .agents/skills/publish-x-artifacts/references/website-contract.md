# ancher.us publication contract

Apply this only after explicit approval of the corresponding Artifact review packet and after the Artifact is public.

## Gallery page

- Keep the established Ancher visual language and page structure.
- Use the real public Artifact screenshot as the finished-result image, not stock art, an X screenshot, or a mockup.
- Link the finished-result area to the public .ancher.app Artifact.
- Use a source-derived editorial title and benefit-led description; do not label the work Sample, Example, or Illustrative.
- Link the Source Trail directly to every approved X post.
- Link the main CTA to https://app.ancher.ai.
- Do not expose unpublished jobs in navigation, audience pages, related items, sitemap, or route generation.

## Prompt and Source row

- Put Prompt on the left and Source Trail on the right on the same horizontal line at desktop widths.
- Use balanced columns (1fr 1fr) and compact vertical spacing.
- Show approximately 3–4 prompt lines initially; contain longer content with scrolling or a deliberate reveal.
- Keep source cards compact. Do not stretch either column to a tall neighbor or leave a large blank field below the shorter column.
- For multiple X posts, use a bounded vertical list or controlled switcher.
- Stack cleanly on smaller screens without horizontal overflow.

## SEO and release checks

- Canonical route: https://ancher.us/templates/<slug>.
- Website title, H1, meta description, Open Graph metadata, and structured data match the source-derived Artifact and approved primary keyword.
- Keep SEO copy on Ancher.us; never inject it into the Artifact merely to satisfy keyword or word-count goals.
- Add the page to sitemap and indexable routes only after approval.
- Keep `/templates/<slug>` out of route generation, navigation, related items, TA pages, and sitemap until its Artifact is approved, public, registered, and backed by a real screenshot.
- Include a `/for/<audience>` TA page in sitemap only when it contains at least one public Artifact card with a real screenshot and link.
- Keep every standalone Prompt-library URL (`/prompts`, prompt details, packs, sources, and outputs) accessible but `noindex, follow` and out of sitemap until that page directly contains the approved X provenance and completed Artifact value required for indexing.
- Treat omission from sitemap and page-level `noindex` as separate controls. Apply both when a page is not index-ready.
- Confirm robots, sitemap, Google indexability, GA4 tracking, Artifact link, every X link, screenshot, responsive layout, and production response.
- Run tests, typecheck, lint, and production build before requesting deployment approval.

## Current release policy

Derive counts from the repository; never hard-code them into a generation run. At the 2026-08-24 handoff, the expected sitemap is the homepage plus 12 completed Artifact pages and six Artifact-backed TA pages. All 54 Prompt-library URLs remain public but non-indexable. A new approved Artifact may change the Artifact and TA counts, but it must not make Prompt pages indexable automatically.
