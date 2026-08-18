import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { PromptCards } from "../../../components/PromptCards";
import { outputTypes, prompts, sourceTypes, toSlug } from "../../../data/prompts";
import { appUrl, siteUrl } from "../../../site";

type PageProps = { params: Promise<{ source: string }> };

export function generateStaticParams() {
  return sourceTypes.map((s) => ({ source: toSlug(s) }));
}

const resolve = (slug: string) => sourceTypes.find((s) => toSlug(s) === slug);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { source } = await params;
  const s = resolve(source);
  if (!s) return {};
  const n = prompts.filter((p) => p.sources.includes(s)).length;
  return {
    title: `${s} prompts`,
    description: `${n} Ancher prompts that turn ${s.toLowerCase()} into finished, cited work.`,
    alternates: { canonical: `/prompts/source/${source}` },
  };
}

export default async function SourcePage({ params }: PageProps) {
  const { source } = await params;
  const s = resolve(source);
  if (!s) notFound();

  const items = prompts.filter((p) => p.sources.includes(s));
  /* The source × output cross-section: this is where the long tail lives. */
  const byOutput = outputTypes
    .map((o) => ({ output: o, n: items.filter((p) => p.outputType === o).length }))
    .filter((x) => x.n > 0);

  return (
    <main className="plib">
      <SiteHeader />
      <div className="wrap detail">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/prompts">Prompt library</Link>
          <span>/</span>
          <span>{s}</span>
        </nav>
        <section className="plib-hero" style={{ paddingTop: 12 }}>
          <h1>Turn {s.toLowerCase()} into finished work.</h1>
          <div className="plib-hero-row">
            <div className="plib-nums">
              <div>
                <b>{items.length}</b>
                <span>Prompts</span>
              </div>
              <div>
                <b>{byOutput.length}</b>
                <span>Output types</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="plib-head">
            <h2>What you can produce from {s.toLowerCase()}</h2>
          </div>
          <div className="plib-chips">
            {byOutput.map(({ output, n }) => (
              <Link key={output} className="plib-chip" href={`/prompts/output/${toSlug(output)}`}>
                <b>{output}</b>
                <em>{n}</em>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="plib-head">
            <h2>All {s.toLowerCase()} prompts</h2>
            <Link href="/prompts">Whole library →</Link>
          </div>
          <PromptCards items={items} />
        </section>

        <section className="plib-index">
          <div className="plib-index-cols">
            <div>
              <h3>Other sources</h3>
              <ul>
                {sourceTypes
                  .filter((o) => o !== s)
                  .map((o) => (
                    <li key={o}>
                      <Link href={`/prompts/source/${toSlug(o)}`}>
                        {o}
                        <em>{prompts.filter((p) => p.sources.includes(o)).length}</em>
                      </Link>
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
          <h2>Your {s.toLowerCase()} are already sources.</h2>
          <a className="primary-button" href={appUrl}>
            Create with Ancher <span>→</span>
          </a>
        </section>
        <footer className="footer">
          <span>© 2026 Ancher</span>
          <span>{siteUrl.replace("https://", "")}</span>
        </footer>
      </div>
    </main>
  );
}
