# Publish X Artifacts — Source Fidelity Forward Test

Date: 2026-08-24

## Raw scenario

A fresh agent received only the revised repo Skill and one approved PRD X record. It was asked to prepare a locked generation brief without modifying files or calling external services.

## Previous behavior

The earlier Skill forward test forced the Gallery primary keyword into title/H1, required 700–1,800 words, put a visible X source trail inside the Artifact, and required an unlinked footer. During the live batch, generation also invented fictional projects and added “Illustrative example.”

## Revised behavior

The revised Skill produced:

- a specific source-derived headline;
- the exact [project name] placeholder;
- no fictional product, company, feature, metric, user, or technical architecture;
- supported insights tied to the source’s priority, complexity, journey, scope, and risk fields;
- no X URL or provenance panel inside the Artifact;
- no Sample, Example, or Illustrative framing;
- no forced Gallery keyword;
- exactly one linked Design in ancher footer;
- a stop at brief_ready because the evaluation explicitly prohibited generation.

## Loophole found and closed

The evaluator inferred a publication date from the Tweet ID even though no date was supplied in the test fixture. The Skill now requires missing source metadata to remain unavailable and explicitly forbids deriving a date from a Tweet ID.

## Metadata-gap retest

A second fresh agent received an executive-summary prompt with no supplied author, date, or media metadata. It kept all three unavailable, refused to infer authorship from the URL path or a date from the status ID, preserved [Book Title], [Author], and [specific field or industry], proposed no fictional book, and stopped before generation as requested.

## Result

The corrected Skill now shapes the intended source-faithful Artifact brief, closes the missing-metadata loophole, and separates Artifact content from Ancher.us SEO and provenance UI. Paid generation remains gated until this evaluation and repository tests pass.
