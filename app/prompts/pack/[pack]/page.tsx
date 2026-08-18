import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { OutputThumb } from "../../../components/PaperMotif";
import { getPrompt, packs, toSlug } from "../../../data/prompts";
import { appUrl, siteUrl } from "../../../site";

type PageProps = { params: Promise<{ pack: string }> };

export function generateStaticParams() {
  return packs.map((p) => ({ pack: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pack } = await params;
  const p = packs.find((x) => x.slug === pack);
  if (!p) return {};
  return {
    title: `${p.title} pack`,
    description: p.blurb,
    alternates: { canonical: `/prompts/pack/${p.slug}` },
  };
}

export default async function PackPage({ params }: PageProps) {
  const { pack } = await params;
  const p = packs.find((x) => x.slug === pack);
  if (!p) notFound();

  const steps = p.steps.map(getPrompt).filter((s) => s !== undefined);

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `${p.title} pack`,
    description: p.blurb,
    url: `${siteUrl}/prompts/pack/${p.slug}`,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      url: `${siteUrl}/prompts/${s.slug}`,
      text: s.summary,
    })),
  };

  return (
    <main className="plib">
      <SiteHeader />
      <div className="wrap detail">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/prompts">Prompt library</Link>
          <span>/</span>
          <span>Packs</span>
        </nav>
        <section className="plib-hero" style={{ paddingTop: 12 }}>
          <h1>{p.title}</h1>
          <p style={{ color: "#b8b8b8", fontSize: 16, maxWidth: "62ch", margin: "0 0 24px" }}>{p.blurb}</p>
          <div className="plib-hero-row">
            <div className="plib-nums">
              <div>
                <b>{steps.length}</b>
                <span>Steps, in order</span>
              </div>
              <div>
                <b>{new Set(steps.flatMap((s) => s.sources)).size}</b>
                <span>Source types</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="plib-head">
            <h2>Run these in order</h2>
          </div>
          <div className="plib-rail" style={{ gridTemplateColumns: "1fr" }}>
            {steps.map((s, i) => (
              <Link key={s.slug} className="plib-rank" href={`/prompts/${s.slug}`}>
                <span className="n">{String(i + 1).padStart(2, "0")}</span>
                <span className="mini">
                  <OutputThumb outputType={s.outputType} />
                </span>
                <span className="t">
                  <h3>{s.title}</h3>
                  <span>
                    {s.outputType} · {s.sources.join(" · ")}
                  </span>
                </span>
                <span className="date">{s.keyword}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="plib-index">
          <div className="plib-index-cols">
            <div>
              <h3>Other packs</h3>
              <ul>
                {packs
                  .filter((x) => x.slug !== p.slug)
                  .map((x) => (
                    <li key={x.slug}>
                      <Link href={`/prompts/pack/${x.slug}`}>
                        {x.title}
                        <em>{x.steps.length}</em>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3>Output types in this pack</h3>
              <ul>
                {[...new Set(steps.map((s) => s.outputType))].map((o) => (
                  <li key={o}>
                    <Link href={`/prompts/output/${toSlug(o)}`}>{o}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      <div className="wrap">
        <section className="bottom-cta" style={{ paddingBlock: 22 }}>
          <span className="spark">✦</span>
          <h2>{p.blurb}</h2>
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
