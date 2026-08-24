# Publish X Artifacts Skill — RED Baseline

Date: 2026-08-24

## Scenario

A fresh agent was asked to inspect the seven published examples and propose the first three of the remaining 27 X-backed jobs plus a batch workflow. It received no publishing Skill and was told to optimize for PSEO impressions and clicks.

## Observed failures

- It selected the wrong first three jobs by using `galleryPromptAdditions.ts` order instead of subtracting the seven published slugs from `galleryItems`.
- It introduced unsupported external subjects: Cursor, GitHub Copilot, Claude Code, Windsurf, AAPL, NVDA, MSFT, Notion, ClickUp, Asana, and monday.com.
- It requested new official documentation, pricing, filings, reviews, Reddit, and website captures even though the current 27 jobs must use their existing X sources without supplemental searches.
- It treated X as prompt provenance only rather than the main content input requested by the user.
- It favored workbenches, matrices, heatmaps, terminals, charts, and teardown boards rather than text-first SEO Artifacts.
- It omitted the exact unlinked `Design in ancher` footer contract.
- It did not specify the private-only Ancher generation call, deterministic validation, or the mandatory stop at human review.
- It proposed publishing waves before defining an idempotent job identity and state gate.

## Required correction

The Skill must deterministically derive the hidden set, preserve the supplied X content, default to text-first SEO deliverables, forbid unsupplied company/event facts, generate privately, validate, record state, and stop at `pending_review`.
