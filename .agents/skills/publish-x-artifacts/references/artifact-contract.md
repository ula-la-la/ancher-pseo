# Artifact contract

## Positive recipe

Each Artifact is a finished, shareable HTML deliverable for one or more Ancher audiences: Founders, Investors, Researchers, Creators, Product & Growth, and Consultants.

Build it in this order:

1. Read every approved X post as content input.
2. Identify the source purpose, intended reader, facts, claims, entities, numbers, constraints, media, and placeholders.
3. Select a fitting editorial form: news-style feature, report, guide, memo, brief, comparison, prompt, checklist, reference, or another structure implied by the source.
4. Write a specific headline from the source content. It should read like a finished news, feature, or product headline—not a Gallery output label.
5. Preserve useful source detail and placeholders.
6. Add synthesis, implications, connections, or new insights only when supported by the approved source set or a clearly reasonable inference.
7. Arrange the content into responsive, readable HTML.
8. End with exactly one quiet small link: Design in ancher to https://app.ancher.ai.

## Source fidelity

- A source may be one post or a primary post plus distinct supporting posts.
- Use only supplied source metadata. Do not infer a publication date from a Tweet ID or guess a missing author, timestamp, or media item.
- Combine multiple posts only when they address the same purpose, event, company, product, or question.
- Preserve meaningful disagreements rather than forcing false consensus.
- Use source media when it materially improves the Artifact.
- Keep placeholders such as [project name], [Book Title], or [paste transcript] when the source does not supply the value.
- Do not invent a company, person, product, event, book, project, meeting, statistic, quotation, or current fact.
- Do not add Illustrative example, Example, Sample, fictional-case labels, or demonstration disclaimers unless the source itself requires the exact wording to preserve meaning.
- Do not convert a prompt into an unrelated fictional result. Present or structure the prompt’s actual purpose when required inputs are absent.
- Do not reduce the source to a generic summary unless summarization is itself the source’s purpose.
- Do not pad the Artifact to a minimum word count.

## Editorial title

The title must be:

- specific to the source subject and purpose;
- attractive enough to click and share;
- proportional to the source evidence;
- present in both title and H1 elements.

Reject bare output labels and framing such as Sample Report, Example Summary, Illustrative PRD, or a title equal only to Research report.

## Separation of surfaces

The Artifact contains the deliverable only. It must not contain:

- X URLs or a Source Trail;
- Prompt Inspiration or provenance panels;
- Ancher.us SEO copy, Gallery keywords, or wrapper sections;
- a large CTA or marketing block;
- internal review, draft, private, pending, or publication-state text.

Ancher.us owns SEO title and description, Prompt and Source cards, X links, audience routing, the public Artifact screenshot, and the Make your own with Ancher CTA.

## Footer

At the absolute end of the page, include one footer containing one anchor whose visible text is Design in ancher and whose href is https://app.ancher.ai. Styling may vary, but the link must remain quiet and small. Nothing visible appears after it.

## Validation boundary

The deterministic validator checks structure, banned framing, locked titles, known disallowed entities, source UI separation, internal workflow language, and footer behavior. Editorial review must still confirm factual fidelity, unsupported inference, useful hierarchy, responsive layout, media quality, and whether the headline matches the source.
