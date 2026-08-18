import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";
import { OutputThumb, PaperMotif, outputMotif, outputTint } from "../components/PaperMotif";
import { PromptGrid } from "../components/PromptGrid";
import {
  countByAudience,
  countByOutput,
  countBySource,
  outputTypes,
  packs,
  prompts,
  recentlyAdded,
  sourceTypes,
  toSlug,
  type SourceType,
} from "../data/prompts";
import { useCases } from "../data/useCases";
import { appUrl, siteUrl } from "../site";

export const metadata: Metadata = {
  title: "Prompt Library",
  description:
    "Prompts that run against your own sources — PDFs, threads, calls, and articles — and return something finished and cited.",
  alternates: { canonical: "/prompts" },
  openGraph: {
    title: "Ancher Prompt Library",
    description: "Prompts for the work you owe, grouped by source, output, and audience.",
    url: `${siteUrl}/prompts`,
  },
};

/* Icons for the "browse by source" tiles. */
const sourceIcon: Partial<Record<SourceType, React.ReactNode>> = {
  "PDFs & papers": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </svg>
  ),
  "YouTube & video": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2" y="5" width="20" height="14" rx="3" />
      <path d="m10 9 5 3-5 3z" />
    </svg>
  ),
  "X threads": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z" />
    </svg>
  ),
  "Meeting recordings": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v4" />
    </svg>
  ),
  Podcasts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 11v2M8 8v8M12 5v14M16 8v8M20 11v2" />
    </svg>
  ),
  "Web articles": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
    </svg>
  ),
};

const sourceBlurb: Record<string, string> = {
  "PDFs & papers": "Reports, filings, academic papers",
  "Web articles": "Saved reading, competitor pages",
  "YouTube & video": "Lectures, talks, product demos",
  Podcasts: "Episodes and transcripts",
  "X threads": "Launch threads, debates, benchmarks",
  "Meeting recordings": "Calls, interviews, standups",
  "Filings & reports": "10-K, 13F, analyst notes",
  "Metrics & exports": "Dashboards and CSV exports",
  "Interview transcripts": "User and expert interviews",
  "Email & Slack": "Threads and decision trails",
};

const sourceTint: Record<string, string> = {
  "PDFs & papers": "ochre",
  "Web articles": "teal",
  "YouTube & video": "rose",
  Podcasts: "sunset",
  "X threads": "violet",
  "Meeting recordings": "navy",
  "Filings & reports": "forest",
  "Metrics & exports": "copper",
  "Interview transcripts": "plum",
  "Email & Slack": "sage",
};

/** The six tiles shown in section 03; the rest live in the footer index. */
const featuredSources: SourceType[] = [
  "PDFs & papers",
  "YouTube & video",
  "X threads",
  "Meeting recordings",
  "Podcasts",
  "Web articles",
];

export default function PromptsPage() {
  const sourceCount = sourceTypes.filter((s) => countBySource(s) > 0).length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ancher Prompt Library",
    description: metadata.description,
    url: `${siteUrl}/prompts`,
    numberOfItems: prompts.length,
    hasPart: prompts.map((p) => ({
      "@type": "HowTo",
      name: p.title,
      url: `${siteUrl}/prompts/${p.slug}`,
    })),
  };

  return (
    <main className="plib">
      <SiteHeader />
      <div className="wrap">
        <section className="plib-hero">
          <h1>Prompts for the work you owe.</h1>
          <div className="plib-hero-row">
            {/* Every figure below is counted from app/data/prompts.ts. */}
            <div className="plib-nums">
              <div>
                <b>{prompts.length}</b>
                <span>Prompts</span>
              </div>
              <div>
                <b>{outputTypes.length}</b>
                <span>Output types</span>
              </div>
              <div>
                <b>{sourceCount}</b>
                <span>Source types</span>
              </div>
              <div>
                <b>{packs.length}</b>
                <span>Packs</span>
              </div>
            </div>
          </div>
        </section>

        {/* 01 ---------------------------------------------------------- */}
        <section>
          <div className="plib-head">
            <h2>
              <em>01</em> Featured packs
            </h2>
            <Link href="/prompts">All packs →</Link>
          </div>
          <div className="plib-packs">
            {packs.map((pack) => {
              const first = prompts.find((p) => p.slug === pack.steps[0]);
              const motif = first ? outputMotif[first.outputType] : "doc";
              return (
                <Link key={pack.slug} className="plib-pack" href={`/prompts/pack/${pack.slug}`}>
                  <div className={`plib-thumb ${pack.accent}`}>
                    <div className="row">
                      <PaperMotif motif={motif} />
                      <PaperMotif motif={motif} />
                      <PaperMotif motif={motif} />
                    </div>
                  </div>
                  <div className="plib-pack-body">
                    <h3>{pack.title}</h3>
                    <p>{pack.blurb}</p>
                    <div className="f">
                      <span>Runs in order</span>
                      <b>{pack.steps.length} prompts →</b>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 02 ---------------------------------------------------------- */}
        <section>
          <div className="plib-head">
            <h2>
              <em>02</em> Recently added
            </h2>
            <Link href="/prompts">Everything →</Link>
          </div>
          {/* Ordered by real addedAt dates. There is no usage telemetry yet, so
              there is no "most popular" ranking to show — and inventing one
              would be the easiest thing on this page to get caught doing. */}
          <div className="plib-rail">
            {recentlyAdded.map((p, i) => (
              <Link key={p.slug} className="plib-rank" href={`/prompts/${p.slug}`}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className={`mini ${outputTint[p.outputType]}`}>
                  <PaperMotif motif={outputMotif[p.outputType]} />
                </span>
                <span className="t">
                  <h3>{p.title}</h3>
                  <span>{p.outputType}</span>
                </span>
                <span className="date">{p.addedAt.slice(5)}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 03 ---------------------------------------------------------- */}
        <section>
          <div className="plib-head">
            <h2>
              <em>03</em> Browse by source
            </h2>
            <Link href="/prompts">All sources →</Link>
          </div>
          <div className="plib-tiles">
            {featuredSources.map((s) => (
              <Link key={s} className="plib-tile" href={`/prompts/source/${toSlug(s)}`}>
                <span className={`ico ${sourceTint[s]}`}>{sourceIcon[s]}</span>
                <span className="tx">
                  <h3>{s}</h3>
                  <p>{sourceBlurb[s]}</p>
                </span>
                <span className="cnt">{countBySource(s)}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* 04 ---------------------------------------------------------- */}
        <section>
          <div className="plib-head">
            <h2>
              <em>04</em> Browse by output
            </h2>
            <Link href="/prompts">All output types →</Link>
          </div>
          <div className="plib-chips">
            {outputTypes.map((o) => (
              <Link key={o} className="plib-chip" href={`/prompts/output/${toSlug(o)}`}>
                <span className={`sw ${outputTint[o]}`} />
                <b>{o}</b>
                <em>{countByOutput(o)}</em>
              </Link>
            ))}
          </div>
        </section>

        {/* 05 ---------------------------------------------------------- */}
        <section>
          <div className="plib-head">
            <h2>
              <em>05</em> Browse by audience
            </h2>
            <Link href="/">All audiences →</Link>
          </div>
          <div className="plib-auds">
            {useCases.map((u) => (
              <Link key={u.slug} className="plib-aud" href={`/for/${u.slug}`}>
                <span className="top">
                  <h3>{u.name}</h3>
                  <span className="c">{countByAudience(u.slug)}</span>
                </span>
                <p>{u.typicalSources}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 06 ---------------------------------------------------------- */}
        <section>
          <PromptGrid prompts={prompts} outputTypes={outputTypes} />
        </section>

        {/* 07 ---------------------------------------------------------- */}
        <section className="plib-index">
          <div className="plib-index-cols">
            <div>
              <h3>By audience</h3>
              <ul>
                {useCases.map((u) => (
                  <li key={u.slug}>
                    <Link href={`/for/${u.slug}`}>
                      {u.name}
                      <em>{countByAudience(u.slug)}</em>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>By output</h3>
              <ul>
                {outputTypes.map((o) => (
                  <li key={o}>
                    <Link href={`/prompts/output/${toSlug(o)}`}>
                      {o}
                      <em>{countByOutput(o)}</em>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>By source</h3>
              <ul>
                {sourceTypes.map((s) => (
                  <li key={s}>
                    <Link href={`/prompts/source/${toSlug(s)}`}>
                      {s}
                      <em>{countBySource(s)}</em>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Target keywords</h3>
              {/* Straight from the 2026-08-18 keyword pilot — these are the
                  queries each prompt page is written to answer. */}
              <ul>
                {[...new Set(prompts.map((p) => p.keyword))].sort().slice(0, 14).map((k) => (
                  <li key={k}>
                    <Link href={`/prompts?q=${encodeURIComponent(k)}`}>{k}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bottom-cta" style={{ paddingBlock: 22 }}>
          <span className="spark">✦</span>
          <h2>Run any of these against your own library.</h2>
          <p>Prompts are half of it. Ancher supplies the other half — your sources, already captured.</p>
          <a className="primary-button" href={appUrl}>
            Create with Ancher <span>→</span>
          </a>
        </section>
        <footer className="footer">
          <span>© 2026 Ancher</span>
          <span>Source-grounded work, ready to use.</span>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
