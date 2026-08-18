import type { UseCaseSlug } from "./useCases";

/**
 * The prompt library.
 *
 * Every number shown on /prompts is derived from this array — nothing on the
 * page is hand-written. If a count looks wrong, the data is wrong.
 */

export type OutputType =
  | "Research report"
  | "Memo"
  | "Brief"
  | "Synthesis"
  | "Slide deck"
  | "Comparison"
  | "Newsletter"
  | "Social post";

export type SourceType =
  | "PDFs & papers"
  | "Web articles"
  | "YouTube & video"
  | "Podcasts"
  | "X threads"
  | "Meeting recordings"
  | "Filings & reports"
  | "Metrics & exports"
  | "Interview transcripts"
  | "Email & Slack";

export type Prompt = {
  slug: string;
  title: string;
  outputType: OutputType;
  sources: SourceType[];
  audiences: UseCaseSlug[];
  /** One line, shown under the title on the card. */
  summary: string;
  /** The prompt itself. Copied verbatim by the copy button. */
  body: string;
  /** ISO date. Drives the "Recently added" rail — no fabricated usage stats. */
  addedAt: string;
  /**
   * The researched keyword this prompt is the answer to, from the
   * 2026-08-18 Trends/SEMrush pilot. Volume and KD live on the matching
   * gallery item; this is the join key.
   */
  keyword: string;
  /** Matching slug in app/data/gallery.ts, when the output has its own page. */
  gallerySlug?: string;
};

export const prompts: Prompt[] = [
  {
    slug: "position-memo-from-filings",
    title: "Position memo from filings",
    outputType: "Memo",
    sources: ["Filings & reports", "Meeting recordings"],
    audiences: ["investor"],
    summary: "A one-page thesis with every claim anchored to a filing.",
    addedAt: "2026-08-16",
    keyword: "investment memo template",
    gallerySlug: "investment-position-memo-softbank",
    body: `Read every filing and transcript in this collection. Write a position memo with:

1. Position snapshot
2. The thesis in one page
3. Evidence quoted from the filings, with page anchors
4. Bull case
5. Bear case
6. Dated catalysts
7. Open questions I still need answered

Do not assert anything that isn't in a source. Where sources disagree, show both and name the disagreement.`,
  },
  {
    slug: "literature-review-by-argument",
    title: "Literature review by argument",
    outputType: "Research report",
    sources: ["PDFs & papers"],
    audiences: ["researcher"],
    summary: "Groups papers by the claim they make, not by publication date.",
    addedAt: "2026-08-15",
    keyword: "literature review template",
    gallerySlug: "literature-review",
    body: `Group every paper in this collection by the argument it makes, not by date.

For each thematic group: summarise the shared claim, list the supporting papers with citations, note methodological differences, and flag contradictions between papers.

End with a gaps section: what question does this literature not answer?`,
  },
  {
    slug: "podcast-queue-to-weekly-brief",
    title: "Podcast queue → weekly brief",
    outputType: "Brief",
    sources: ["Podcasts"],
    audiences: ["founder", "creator"],
    summary: "Ten hours of listening compressed to one page with timestamps.",
    addedAt: "2026-08-14",
    keyword: "podcast summarizer",
    gallerySlug: "podcast-to-brief",
    body: `From the episodes saved this week, produce a one-page brief: the three things that actually mattered, each with a verbatim quote, the speaker, and a timestamp link.

Skip anything promotional, and skip anything that repeats a point made in an earlier episode in this collection.`,
  },
  {
    slug: "board-update-with-evidence",
    title: "Board update with evidence",
    outputType: "Memo",
    sources: ["Metrics & exports", "Email & Slack"],
    audiences: ["founder"],
    summary: "Written from the actual numbers, with an appendix a board can audit.",
    addedAt: "2026-08-14",
    keyword: "board update template",
    gallerySlug: "board-update",
    body: `Write this month's board update using the metrics export, my notes, and last month's update for continuity.

Structure: headline, metrics table with month-over-month deltas, what worked, what didn't, asks.

Append an evidence section: for every number in the table, cite the source file and cell.`,
  },
  {
    slug: "competitive-analysis-live-pages",
    title: "Competitive analysis from live pages",
    outputType: "Comparison",
    sources: ["Web articles"],
    audiences: ["product", "consultant", "founder"],
    summary: "Positioning, pricing and capability claims, each one dated.",
    addedAt: "2026-08-13",
    keyword: "competitive analysis template",
    gallerySlug: "competitive-analysis",
    body: `Compare every competitor in this collection on: positioning statement, target segment, pricing model and published prices, capability claims, proof points, and gaps.

Output a comparison table plus a short read on where we are differentiated.

Date every claim — pricing pages change and an undated comparison rots silently.`,
  },
  {
    slug: "ai-model-comparison-post",
    title: "AI model comparison post",
    outputType: "Comparison",
    sources: ["X threads", "Web articles"],
    audiences: ["creator", "product"],
    summary: "A week of launch threads turned into something readers can act on.",
    addedAt: "2026-08-17",
    keyword: "ai model comparison",
    gallerySlug: "ai-model-comparison-post",
    body: `From the saved threads and benchmark posts, write a comparison of these models covering: what actually changed, a capability table, benchmark caveats (what the numbers don't measure), pricing and rate limits, and who each model is for.

Link every claim to the thread it came from. Where a benchmark is vendor-reported, say so.`,
  },
  {
    slug: "interview-synthesis-quote-trail",
    title: "Interview synthesis with quote trail",
    outputType: "Synthesis",
    sources: ["Interview transcripts"],
    audiences: ["product", "researcher"],
    summary: "Themes with evidence strength, every quote tied to its transcript.",
    addedAt: "2026-08-12",
    keyword: "user research synthesis template",
    gallerySlug: "user-research-synthesis",
    body: `Cluster the evidence across these interviews into themes.

For each theme: state it in one sentence, rate evidence strength (how many participants, how consistent), include two verbatim quotes with participant ID and timestamp, and note any contradicting evidence.

End with recommended next steps, ranked by how well the evidence supports them.`,
  },
  {
    slug: "saved-articles-to-newsletter",
    title: "Saved articles → newsletter draft",
    outputType: "Newsletter",
    sources: ["Web articles"],
    audiences: ["creator"],
    summary: "Drafted in your voice, clustered, with attribution already in place.",
    addedAt: "2026-08-16",
    keyword: "ai newsletter generator",
    gallerySlug: "saved-articles-to-newsletter",
    body: `Using the articles I saved this week and my last five issues as a voice reference, draft this week's newsletter.

Cluster the saves into two or three themes. Write in my voice — match sentence length and how I open. Attribute and link every source.

Flag anything I saved that I probably shouldn't include, and say why.`,
  },
  {
    slug: "deal-memo-from-data-room",
    title: "Deal memo from the data room",
    outputType: "Memo",
    sources: ["Filings & reports", "Meeting recordings"],
    audiences: ["investor"],
    summary: "Marks what's verified and what's only founder-asserted.",
    addedAt: "2026-08-11",
    keyword: "deal memo template",
    gallerySlug: "vc-deal-memo",
    body: `Write a deal memo from the data room and my call notes: thesis, team, market, traction, competition, risks, proposed terms.

For every factual claim, mark it as [verified: source] or [founder-asserted].

List what I still need to diligence before an IC.`,
  },
  {
    slug: "youtube-to-timestamped-notes",
    title: "YouTube → timestamped notes",
    outputType: "Synthesis",
    sources: ["YouTube & video"],
    audiences: ["creator", "researcher"],
    summary: "Only the claims worth keeping, each with a jumpable timestamp.",
    addedAt: "2026-08-15",
    keyword: "youtube video summarizer",
    gallerySlug: "youtube-video-to-notes",
    body: `From this video's transcript, extract only the claims that carry information — skip intros, sponsor reads, and restatements.

For each: the claim in one line, a timestamp link, and whether the speaker gives evidence for it.

Group by topic, not by order of appearance.`,
  },
  {
    slug: "market-entry-brief",
    title: "Market entry brief",
    outputType: "Brief",
    sources: ["Filings & reports", "Web articles"],
    audiences: ["founder", "consultant", "investor"],
    summary: "A competitor's move into a new market, and what it changes for you.",
    addedAt: "2026-08-10",
    keyword: "market entry strategy template",
    gallerySlug: "market-entry-brief-costco-medicare",
    body: `Using the saved coverage and filings, write a market entry brief: the move, the partner or structure, market size and dynamics, incumbents and their likely response, why now, and the strategic read for us.

Separate what has been announced from what is being inferred by journalists.`,
  },
  {
    slug: "summarise-pdf-keep-citations",
    title: "Summarise a PDF, keep citations",
    outputType: "Research report",
    sources: ["PDFs & papers"],
    audiences: ["researcher", "consultant", "investor"],
    summary: "Every sentence in the summary still points to its page.",
    addedAt: "2026-08-17",
    keyword: "summarize pdf with ai",
    gallerySlug: "summarize-pdf-with-ai",
    body: `Summarise this document so that each sentence in the summary carries a page reference.

Structure: what the document argues, the evidence it offers, its stated limitations, and anything it conspicuously does not address.

Do not smooth over hedged language — if the source says "may", don't write "does".`,
  },
  {
    slug: "weekly-digest-deck",
    title: "Weekly digest deck",
    outputType: "Slide deck",
    sources: ["Web articles", "Metrics & exports"],
    audiences: ["consultant", "product", "founder"],
    summary: "Ten slides covering the week, citations in every footer.",
    addedAt: "2026-08-09",
    keyword: "weekly update presentation template",
    gallerySlug: "weekly-digest-deck",
    body: `Build a ten-slide internal digest from this week's saved sources: cover, the week in one slide, two to three themes, signals worth watching, implications for us, and a sources slide.

Every slide that makes a claim carries the citation in the footer. Keep body text under 30 words per slide.`,
  },
  {
    slug: "macro-brief-from-rate-data",
    title: "Macro brief from rate data",
    outputType: "Brief",
    sources: ["Filings & reports", "Web articles"],
    audiences: ["investor"],
    summary: "What moved, why, and what it changes for positioning.",
    addedAt: "2026-08-08",
    keyword: "macro research brief template",
    gallerySlug: "macro-brief-treasury-yields",
    body: `Write a macro brief covering: what moved this week and by how much, the drivers named by each source, the curve view, what strategists disagree about, implications, and a watch list with dates.

Where strategists conflict, name them and summarise both sides rather than averaging them into a consensus that nobody holds.`,
  },
  {
    slug: "case-study-from-customer-calls",
    title: "Case study from customer calls",
    outputType: "Research report",
    sources: ["Meeting recordings", "Metrics & exports"],
    audiences: ["product", "consultant", "creator"],
    summary: "A publishable case study in the customer's own words.",
    addedAt: "2026-08-07",
    keyword: "case study template",
    gallerySlug: "case-study",
    body: `Draft a case study from these calls and metrics: the situation before, what changed, how, and the measured result.

Use the customer's own phrasing wherever possible — pull direct quotes.

Mark every number with its source so it can be approved by their team before publication.`,
  },
  {
    slug: "x-thread-to-explainer",
    title: "X thread → explainer post",
    outputType: "Social post",
    sources: ["X threads"],
    audiences: ["creator"],
    summary: "Expands a saved thread into a piece that stands on its own.",
    addedAt: "2026-08-16",
    keyword: "ai model comparison",
    body: `Take this saved thread and the discussion under it, and write a standalone explainer for someone who did not see the thread.

Open with the question the thread is answering. Include the strongest counterargument from the replies. Credit and link the original author.`,
  },
  {
    slug: "recording-to-decisions",
    title: "Recording → decisions and owners",
    outputType: "Synthesis",
    sources: ["Meeting recordings"],
    audiences: ["product", "founder", "consultant"],
    summary: "Only what was decided, who owns it, and when it was said.",
    addedAt: "2026-08-13",
    keyword: "meeting notes template",
    gallerySlug: "meeting-notes",
    body: `From this recording, extract only: decisions made, who owns each, the stated deadline, and open questions left unresolved.

Each item carries the timestamp where it was said.

Do not include discussion that did not resolve into a decision — list those separately under "unresolved".`,
  },
  {
    slug: "study-guide-from-reading-list",
    title: "Study guide from a reading list",
    outputType: "Research report",
    sources: ["PDFs & papers"],
    audiences: ["researcher"],
    summary: "Organised by concept rather than by source.",
    addedAt: "2026-08-06",
    keyword: "study guide template",
    gallerySlug: "study-guide",
    body: `Build a study guide from these sources, organised by concept rather than by source.

For each concept: a plain-language definition, the formal statement as the source gives it, a worked example if one exists in the material, and a self-test question.

Cite the source and page for each.`,
  },
  {
    slug: "executive-summary-from-long-doc",
    title: "Executive summary from a long doc",
    outputType: "Memo",
    sources: ["PDFs & papers", "Filings & reports"],
    audiences: ["consultant", "founder", "investor"],
    summary: "One page for a reader who will never open the original.",
    addedAt: "2026-08-12",
    keyword: "executive summary template",
    gallerySlug: "executive-summary",
    body: `Compress this to one page for a reader who will not open the original.

Lead with the decision it implies. Keep every number exact. Flag anything the source hedges rather than restating it as settled.`,
  },
  {
    slug: "meeting-notes-that-survive",
    title: "Meeting notes that survive a month",
    outputType: "Synthesis",
    sources: ["Meeting recordings"],
    audiences: ["product", "founder", "consultant"],
    summary: "Notes a stranger could read in four weeks and still follow.",
    addedAt: "2026-08-11",
    keyword: "meeting notes template",
    gallerySlug: "meeting-notes",
    body: `Write notes a stranger could read in four weeks: context, what was decided, why, who owns what, and what changed since last time.

No transcript dumps. If a thread of discussion went nowhere, say that in one line rather than reproducing it.`,
  },
  {
    slug: "user-research-readout-deck",
    title: "User research readout deck",
    outputType: "Slide deck",
    sources: ["Interview transcripts"],
    audiences: ["product", "researcher"],
    summary: "Themes, evidence, and quotes — built for a room, not a reader.",
    addedAt: "2026-08-05",
    keyword: "research synthesis template",
    gallerySlug: "user-research-synthesis",
    body: `Turn this synthesis into a readout deck: what we asked, who we spoke to, the themes ranked by evidence strength, one verbatim quote per theme, contradictions, and recommended next steps.

One idea per slide. Put the participant ID under every quote.`,
  },
  {
    slug: "competitor-changelog-watch",
    title: "Competitor changelog watch",
    outputType: "Brief",
    sources: ["Web articles"],
    audiences: ["product", "founder"],
    summary: "What competitors shipped, and which of it actually matters.",
    addedAt: "2026-08-04",
    keyword: "competitive landscape template",
    gallerySlug: "competitive-landscape",
    body: `From the saved changelogs and release notes, write a brief covering: what each competitor shipped this period, which items are substantive versus cosmetic, what it implies about their roadmap, and what it means for ours.

Ignore rewordings of existing features. Say so if a release is mostly marketing.`,
  },
  {
    slug: "slack-thread-to-decision-log",
    title: "Slack thread → decision log",
    outputType: "Synthesis",
    sources: ["Email & Slack"],
    audiences: ["product", "founder"],
    summary: "Rescues the decision buried in a 200-message thread.",
    addedAt: "2026-08-10",
    keyword: "project status report template",
    gallerySlug: "project-status-report",
    body: `From this thread, extract the decision that was actually reached, who made it, when, what alternatives were considered and rejected, and what was left open.

Link to the specific message for each. If no decision was reached, say so plainly rather than manufacturing one.`,
  },
  {
    slug: "newsletter-issue-from-podcasts",
    title: "Newsletter issue from podcasts",
    outputType: "Newsletter",
    sources: ["Podcasts", "YouTube & video"],
    audiences: ["creator"],
    summary: "Turns a listening week into an issue with quotes and links.",
    addedAt: "2026-08-03",
    keyword: "newsletter curation tool",
    body: `Draft a newsletter issue from the episodes I listened to this week.

Lead with the single most interesting claim anyone made. Include two or three quotes with speaker, show, and timestamp links. Close with what I'd want to hear discussed next.

Match the voice of my previous issues.`,
  },
  {
    slug: "market-research-report-from-sources",
    title: "Market research report from scattered sources",
    outputType: "Research report",
    sources: ["Web articles", "Filings & reports", "PDFs & papers"],
    audiences: ["founder", "product", "consultant"],
    summary: "Landscape, players, signals and recommendations, all sourced.",
    addedAt: "2026-08-08",
    keyword: "market research report template",
    gallerySlug: "market-research-report",
    body: `Build a market research report from everything in this collection: executive summary, market landscape, key players, signals and trends, strategic implications, recommendations.

Every claim carries its source. Where two sources give different market sizes, show both and say which methodology you trust and why.`,
  },
  {
    slug: "content-brief-from-serp-and-notes",
    title: "Content brief from research",
    outputType: "Brief",
    sources: ["Web articles", "PDFs & papers"],
    audiences: ["creator", "product"],
    summary: "What to cover, what to prove, and what everyone else missed.",
    addedAt: "2026-08-07",
    keyword: "content brief template",
    gallerySlug: "content-brief",
    body: `Write a content brief from the saved sources: the search intent, the angle, the outline, the claims that need evidence, and the sources for each.

Add a section on what the existing coverage gets wrong or omits — that gap is the reason to publish.`,
  },
  {
    slug: "prd-from-research-and-tickets",
    title: "PRD from research and tickets",
    outputType: "Memo",
    sources: ["Interview transcripts", "Email & Slack", "Metrics & exports"],
    audiences: ["product"],
    summary: "Problem, evidence, scope and open questions — with the receipts.",
    addedAt: "2026-08-06",
    keyword: "product requirements document template",
    gallerySlug: "product-requirements-document",
    body: `Draft a PRD from the interviews, tickets, and metrics in this collection: the problem, who has it and how often, the evidence, goals and non-goals, proposed scope, risks, open questions.

Link each stated problem to the interview or ticket that raised it. Do not invent requirements the evidence does not support.`,
  },
  {
    slug: "pitch-deck-narrative",
    title: "Pitch deck narrative from your own material",
    outputType: "Slide deck",
    sources: ["Metrics & exports", "Interview transcripts", "Web articles"],
    audiences: ["founder"],
    summary: "The story your metrics and customer evidence actually support.",
    addedAt: "2026-08-05",
    keyword: "pitch deck template",
    gallerySlug: "startup-pitch-deck",
    body: `Build a pitch deck narrative from my metrics, customer conversations, and market sources: problem, why now, solution, traction, market, competition, team, ask.

For each slide, list the evidence behind it and flag any slide where the evidence is thin — that is where the hard questions will land.`,
  },
  {
    slug: "competitor-matrix",
    title: "Competitor matrix",
    outputType: "Comparison",
    sources: ["Web articles"],
    audiences: ["product", "consultant"],
    summary: "One row per competitor, one column per thing that decides deals.",
    addedAt: "2026-08-04",
    keyword: "competitor matrix template",
    gallerySlug: "competitor-matrix",
    body: `Build a competitor matrix. Choose columns based on what actually decides deals in this category, not on feature lists.

Fill each cell from a source and cite it. Leave a cell blank rather than guessing, and list the blanks at the end as research to do.`,
  },
  {
    slug: "website-competitor-teardown",
    title: "Website competitor teardown",
    outputType: "Research report",
    sources: ["Web articles"],
    audiences: ["creator", "product"],
    summary: "Messaging, navigation, proof and conversion paths, side by side.",
    addedAt: "2026-08-03",
    keyword: "website competitor analysis template",
    gallerySlug: "website-competitor-analysis",
    body: `Tear down each competitor site in this collection: messaging hierarchy, information architecture, content strategy, conversion paths, proof points.

End with the three things they do that we should copy and the three we should deliberately not.`,
  },
  {
    slug: "organise-research-papers",
    title: "Organise a paper library for retrieval",
    outputType: "Synthesis",
    sources: ["PDFs & papers"],
    audiences: ["researcher"],
    summary: "Filing built around finding things again, not around tidiness.",
    addedAt: "2026-08-02",
    keyword: "how to organize research papers",
    gallerySlug: "organize-research-papers",
    body: `Go through this paper library and produce a retrieval-first index: for each paper, the claim it makes, the method, the dataset, and the two or three questions it would be the right answer to.

Then group papers that answer the same question, and note which supersedes which.`,
  },
  {
    slug: "analyst-call-tracker",
    title: "Analyst call tracker",
    outputType: "Comparison",
    sources: ["YouTube & video", "Filings & reports"],
    audiences: ["investor"],
    summary: "Public calls lined up against what actually happened.",
    addedAt: "2026-08-09",
    keyword: "stock research template",
    gallerySlug: "analyst-call-tracker",
    body: `Build a tracker of the public calls in this collection: the call, the date, the evidence cited at the time, contradicting evidence available at the time, and the outcome since.

Do not grade the caller. Just line up the claim against the record and let the pattern show.`,
  },
];

/* ------------------------------------------------------------------ packs */

export type Pack = {
  slug: string;
  title: string;
  blurb: string;
  accent: string;
  /** Prompt slugs, in the order they are meant to be run. */
  steps: string[];
};

export const packs: Pack[] = [
  {
    slug: "investor-diligence",
    title: "Investor diligence",
    blurb: "Data room and founder calls to a memo the partnership can argue with.",
    accent: "forest",
    steps: [
      "summarise-pdf-keep-citations",
      "position-memo-from-filings",
      "market-entry-brief",
      "macro-brief-from-rate-data",
      "deal-memo-from-data-room",
    ],
  },
  {
    slug: "weekly-newsletter",
    title: "Weekly newsletter",
    blurb: "A week of saves to a drafted issue — curated, clustered, voice-matched.",
    accent: "sunset",
    steps: [
      "youtube-to-timestamped-notes",
      "podcast-queue-to-weekly-brief",
      "x-thread-to-explainer",
      "saved-articles-to-newsletter",
      "newsletter-issue-from-podcasts",
    ],
  },
  {
    slug: "user-research-synthesis",
    title: "User research synthesis",
    blurb: "Raw transcripts to themes, evidence strength, and a readout deck.",
    accent: "plum",
    steps: [
      "recording-to-decisions",
      "interview-synthesis-quote-trail",
      "user-research-readout-deck",
    ],
  },
];

/* -------------------------------------------------------------- selectors */
/* Everything the page displays as a number comes from here. */

export const outputTypes = [
  "Research report",
  "Memo",
  "Brief",
  "Synthesis",
  "Slide deck",
  "Comparison",
  "Newsletter",
  "Social post",
] as const satisfies readonly OutputType[];

export const sourceTypes = [
  "PDFs & papers",
  "Web articles",
  "YouTube & video",
  "Podcasts",
  "X threads",
  "Meeting recordings",
  "Filings & reports",
  "Metrics & exports",
  "Interview transcripts",
  "Email & Slack",
] as const satisfies readonly SourceType[];

export const countByOutput = (o: OutputType) =>
  prompts.filter((p) => p.outputType === o).length;

export const countBySource = (s: SourceType) =>
  prompts.filter((p) => p.sources.includes(s)).length;

export const countByAudience = (a: UseCaseSlug) =>
  prompts.filter((p) => p.audiences.includes(a)).length;

/** Newest first. Used by the "Recently added" rail — real dates, no fake usage stats. */
export const recentlyAdded = [...prompts]
  .sort((a, b) => (a.addedAt < b.addedAt ? 1 : -1))
  .slice(0, 6);

export const getPrompt = (slug: string) => prompts.find((p) => p.slug === slug);

/**
 * How each source reads mid-sentence. Blind toLowerCase() would render
 * "X threads" as "x threads" and "PDFs & papers" as "pdfs & papers" on every
 * source landing page, so the casing is spelled out here instead.
 */
export const sourcePhrase: Record<SourceType, string> = {
  "PDFs & papers": "PDFs and papers",
  "Web articles": "saved web articles",
  "YouTube & video": "YouTube videos",
  Podcasts: "podcasts",
  "X threads": "X threads",
  "Meeting recordings": "meeting recordings",
  "Filings & reports": "filings and reports",
  "Metrics & exports": "metrics exports",
  "Interview transcripts": "interview transcripts",
  "Email & Slack": "email and Slack threads",
};

/** Slug helpers for the /prompts/source/<slug> and /prompts/output/<slug> pages. */
export const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
