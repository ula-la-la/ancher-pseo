export type GalleryArtifact = {
  slug: string;
  tweetId: string;
  title: string;
  artifactId: string;
  audience: "founder" | "investor" | "researcher" | "creator" | "product-growth" | "consultant";
  status: "review" | "published";
  reviewUrl?: string;
  shareUrl?: string;
  screenshot?: string;
  createdAt: string;
};

export const galleryArtifacts = {
  "study-guide": {
    slug: "study-guide",
    tweetId: "1998334446379188696",
    title: "Transformer Attention: The Study Guide You Won't Forget",
    artifactId: "01a02560-d3a0-7722-9493-1da33918c7be",
    audience: "researcher",
    status: "published",
    shareUrl: "https://transformer-attention-interactive-study-guide-7c06954e7c5026ab.ancher.app/",
    screenshot: "/gallery-artifacts/study-guide.png",
    createdAt: "2026-08-21",
  },
  "board-update": {
    slug: "board-update",
    tweetId: "2086377323578949870",
    title: "CFO-Ready Board Report: Revenue Variance, Margin, Cash Runway & CFO Narrative",
    artifactId: "01a025d2-f311-7151-a0da-2c382a9babd1",
    audience: "founder",
    status: "published",
    shareUrl: "https://cfo-board-report-financial-dashboard-6a5e891e1fa22937.ancher.app/",
    screenshot: "/gallery-artifacts/board-update.jpg",
    createdAt: "2026-08-21",
  },
  "analyst-call-tracker": {
    slug: "analyst-call-tracker",
    tweetId: "1772458620170441024",
    title: "NVDA Q4 FY24 Earnings Evidence Tracker",
    artifactId: "01a025ec-2f16-71c3-9990-062d30f37a51",
    audience: "investor",
    status: "published",
    shareUrl: "https://nvda-q4-fy24-earnings-evidence-tracker-e847deb2e7b30d3d.ancher.app/",
    screenshot: "/gallery-artifacts/analyst-call-tracker.jpg",
    createdAt: "2026-08-21",
  },
  "literature-review": {
    slug: "literature-review",
    tweetId: "2016131687273341190",
    title: "TimeXer & Financial Data Transformers: Systematic Literature Review",
    artifactId: "01a025e7-cf6d-7fc3-a652-6f0fa9bb8685",
    audience: "researcher",
    status: "published",
    shareUrl: "https://timexer-and-financial-transformers-evidence-ma-768c38ac445c1f1c.ancher.app/",
    screenshot: "/gallery-artifacts/literature-review.jpg",
    createdAt: "2026-08-21",
  },
  "content-brief": {
    slug: "content-brief",
    tweetId: "2018991436222591434",
    title: "AI Productivity Tools SEO Content Brief: SERP, Intent & Differentiation",
    artifactId: "01a025ea-1092-7e81-a7b7-25bd99bebf51",
    audience: "creator",
    status: "published",
    shareUrl: "https://ai-productivity-tools-seo-content-brief-934b9e24e3742709.ancher.app/",
    screenshot: "/gallery-artifacts/content-brief.jpg",
    createdAt: "2026-08-21",
  },
  "user-research-synthesis": {
    slug: "user-research-synthesis",
    tweetId: "2044375991867318680",
    title: "JTBD Interview Synthesis: Four Forces, Job Clusters & Product Opportunities",
    artifactId: "01a025d9-a3c4-74d3-822c-e70148d2e375",
    audience: "product-growth",
    status: "published",
    shareUrl: "https://jtbd-interview-synthesis-dashboard-f1cad6e39349e64b.ancher.app/",
    screenshot: "/gallery-artifacts/user-research-synthesis.jpg",
    createdAt: "2026-08-21",
  },
  "market-research-report": {
    slug: "market-research-report",
    tweetId: "1929321780319039955",
    title: "Wedding Photography Market Disruption Report: New $3K Service Opportunities",
    artifactId: "01a025e5-38eb-7901-bab2-73fe737fb3ac",
    audience: "consultant",
    status: "published",
    shareUrl: "https://wedding-photography-market-disruption-report-1f68bbe5c235b768.ancher.app/",
    screenshot: "/gallery-artifacts/market-research-report.jpg",
    createdAt: "2026-08-21",
  },
  "research-report": {
    slug: "research-report",
    tweetId: "1879566024720494745",
    title: "The Leaked Gemini Prompt for Editing Source-Grounded Research Reports",
    artifactId: "01a0352a-ac18-7393-9429-8cc8f3ec0067",
    audience: "researcher",
    status: "published",
    shareUrl: "https://the-leaked-gemini-prompt-for-editing-source-gr-d8669bfe0ebbe785.ancher.app/",
    screenshot: "/gallery-artifacts/research-report.png",
    createdAt: "2026-08-24",
  },
  "executive-summary": {
    slug: "executive-summary",
    tweetId: "1845071746774466795",
    title: "Turn Any Book Into an Executive Brief With One Focused Prompt",
    artifactId: "01a0352a-a3fb-78c3-8cb1-929e52389f08",
    audience: "founder",
    status: "published",
    shareUrl: "https://turn-any-book-into-an-executive-brief-with-one-f07341512b49e473.ancher.app/",
    screenshot: "/gallery-artifacts/executive-summary.png",
    createdAt: "2026-08-24",
  },
  "project-status-report": {
    slug: "project-status-report",
    tweetId: "1905905648552071547",
    title: "Six Signals That Make a Weekly Project Update Actually Useful",
    artifactId: "01a0352a-a631-7db3-b795-5a2baf9925e9",
    audience: "product-growth",
    status: "published",
    shareUrl: "https://six-signals-that-make-a-weekly-project-update-e61dc63e693d4659.ancher.app/",
    screenshot: "/gallery-artifacts/project-status-report.png",
    createdAt: "2026-08-24",
  },
  "product-requirements-document": {
    slug: "product-requirements-document",
    tweetId: "2051957694454444370",
    title: "The PRD Prompt to Run Before You Write a Single Line of Code",
    artifactId: "01a0352a-a7f4-7d81-b2b6-744e006650ad",
    audience: "product-growth",
    status: "published",
    shareUrl: "https://the-prd-prompt-to-run-before-you-write-a-singl-69f45bf7b990bf2e.ancher.app/",
    screenshot: "/gallery-artifacts/product-requirements-document.png",
    createdAt: "2026-08-24",
  },
  "meeting-notes": {
    slug: "meeting-notes",
    tweetId: "1897224845798334552",
    title: "Turn a 60-Minute Meeting Into a 200-Word Decision Brief",
    artifactId: "01a0352a-aa44-7fa3-a81c-80a42a8efa5c",
    audience: "founder",
    status: "published",
    shareUrl: "https://turn-a-60-minute-meeting-into-a-200-word-decis-b9405d13891790c1.ancher.app/",
    screenshot: "/gallery-artifacts/meeting-notes.png",
    createdAt: "2026-08-24",
  },
} satisfies Record<string, GalleryArtifact>;

export function getGalleryArtifact(slug: string): GalleryArtifact | undefined {
  return galleryArtifacts[slug as keyof typeof galleryArtifacts];
}

export function getGalleryArtifactUrl(artifact: GalleryArtifact): string {
  const url = artifact.status === "published" ? artifact.shareUrl : artifact.reviewUrl;
  if (!url) throw new Error(`Missing ${artifact.status} URL for ${artifact.slug}`);
  return url;
}
