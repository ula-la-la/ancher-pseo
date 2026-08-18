/**
 * The six audiences Ancher targets, mirrored from ancher.ai/use-cases/*.
 * Every gallery item is mapped to one or more of these so that /for/<slug>
 * landing pages can be generated programmatically.
 */
export type UseCaseSlug =
  | "founder"
  | "investor"
  | "researcher"
  | "creator"
  | "product"
  | "consultant";

export type UseCase = {
  slug: UseCaseSlug;
  name: string;
  /** Used in <h1> on /for/<slug> */
  headline: string;
  /** Used in the meta description and hero paragraph */
  blurb: string;
  /** What this audience typically feeds Ancher */
  typicalSources: string;
  /** Canonical page on the main marketing site */
  canonicalUrl: string;
};

export const useCases: UseCase[] = [
  {
    slug: "founder",
    name: "Founders",
    headline: "Every update, memo, and deck — written from what you already know",
    blurb:
      "Founders carry the whole context and never have time to write it down twice. Turn calls, metrics, and saved reading into board updates, market briefs, and decks with the evidence attached.",
    typicalSources: "Investor calls, metrics exports, customer conversations, competitor pages, saved reading.",
    canonicalUrl: "https://ancher.ai/use-cases/founder",
  },
  {
    slug: "investor",
    name: "Investors",
    headline: "Diligence that stays traceable back to the filing",
    blurb:
      "Memos, theses, and macro briefs assembled from filings, transcripts, and your own notes — with every claim linked to where it came from.",
    typicalSources: "13F/10-K filings, earnings transcripts, founder calls, sell-side notes, data rooms.",
    canonicalUrl: "https://ancher.ai/use-cases/investor",
  },
  {
    slug: "researcher",
    name: "Researchers",
    headline: "Your reading pile, turned into a literature review",
    blurb:
      "Papers, PDFs, and reading notes grouped by argument rather than by folder, with a citation trail you can hand to a reviewer.",
    typicalSources: "Papers, PDFs, citation exports, interview transcripts, reading notes.",
    canonicalUrl: "https://ancher.ai/use-cases/researcher",
  },
  {
    slug: "creator",
    name: "Creators",
    headline: "A week of saves is next week's issue",
    blurb:
      "Newsletters, posts, and comparison pieces drafted in your voice from the articles, videos, and threads you already saved.",
    typicalSources: "Saved articles, X threads, YouTube videos, podcasts, highlights, past issues.",
    canonicalUrl: "https://ancher.ai/use-cases/creator",
  },
  {
    slug: "product",
    name: "Product & growth",
    headline: "Synthesis without losing the quote trail",
    blurb:
      "Interview evidence, competitor moves, and internal notes turned into PRDs, research synthesis, and status updates that cite their sources.",
    typicalSources: "User interviews, support tickets, analytics, competitor pages, team notes.",
    canonicalUrl: "https://ancher.ai/use-cases/product",
  },
  {
    slug: "consultant",
    name: "Consultants",
    headline: "Client-ready deliverables from the material you gathered",
    blurb:
      "Market landscapes, findings decks, and recommendation memos built from client documents and desk research, with sourcing a client can audit.",
    typicalSources: "Client documents, desk research, expert calls, market reports, prior engagements.",
    canonicalUrl: "https://ancher.ai/use-cases/consultant",
  },
];

export const useCaseBySlug = new Map(useCases.map((u) => [u.slug, u]));

export function getUseCase(slug: string): UseCase | undefined {
  return useCaseBySlug.get(slug as UseCaseSlug);
}

/**
 * gallery slug -> audiences. Single source of truth for the /for/<slug> pages
 * and for the audience chips on each output page.
 */
export const useCasesBySlug: Record<string, UseCaseSlug[]> = {
  // --- existing template cluster -------------------------------------------
  "market-research-report": ["founder", "product", "consultant"],
  "competitive-analysis": ["founder", "investor", "product", "consultant"],
  "content-brief": ["creator", "product"],
  "research-report": ["researcher", "consultant"],
  "executive-summary": ["founder", "investor", "consultant"],
  "project-status-report": ["product", "consultant"],
  "product-requirements-document": ["product"],
  "meeting-notes": ["founder", "product", "consultant"],
  "startup-pitch-deck": ["founder", "investor"],
  "case-study": ["creator", "product", "consultant"],
  "study-guide": ["researcher"],
  "competitive-landscape": ["investor", "product", "consultant"],
  "competitor-matrix": ["product", "consultant"],
  "website-competitor-analysis": ["creator", "product"],

  // --- track A: trend-jacking ----------------------------------------------
  "investment-position-memo-softbank": ["investor"],
  "macro-brief-treasury-yields": ["investor"],
  "market-entry-brief-costco-medicare": ["founder", "investor", "consultant"],
  "analyst-call-tracker": ["investor"],

  // --- track B: evergreen clusters -----------------------------------------
  "notebooklm-alternatives": ["researcher", "creator", "consultant"],
  "pocket-alternatives-read-later": ["creator", "researcher"],
  "readwise-alternatives": ["creator", "researcher"],
  "second-brain-app": ["founder", "creator", "researcher"],
  "obsidian-vs-notion": ["creator", "researcher", "product"],
  "ai-model-comparison-post": ["creator", "product"],
  "summarize-pdf-with-ai": ["investor", "researcher", "consultant"],
  "youtube-video-to-notes": ["creator", "researcher"],
  "podcast-to-brief": ["founder", "creator"],
  "saved-articles-to-newsletter": ["creator"],
  "organize-research-papers": ["researcher"],
  "literature-review": ["researcher"],
  "board-update": ["founder"],
  "user-research-synthesis": ["product", "researcher"],
  "vc-deal-memo": ["investor"],
  "weekly-digest-deck": ["founder", "product", "consultant"],
};

export function getUseCasesFor(slug: string): UseCase[] {
  return (useCasesBySlug[slug] ?? [])
    .map((s) => useCaseBySlug.get(s))
    .filter((u): u is UseCase => Boolean(u));
}
