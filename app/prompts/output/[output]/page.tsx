import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../../components/SiteHeader";
import { PromptCards } from "../../../components/PromptCards";
import { outputTypes, prompts, sourceTypes, toSlug } from "../../../data/prompts";
import { appUrl, signupUrl } from "../../../site";

type PageProps = { params: Promise<{ output: string }> };

export function generateStaticParams() {
  return outputTypes.map((o) => ({ output: toSlug(o) }));
}

const resolve = (slug: string) => outputTypes.find((o) => toSlug(o) === slug);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { output } = await params;
  const o = resolve(output);
  if (!o) return {};
  const n = prompts.filter((p) => p.outputType === o).length;
  return {
    title: `${o} prompts`,
    description: `${n} Ancher prompts that produce a ${o.toLowerCase()} from your own sources.`,
    alternates: { canonical: `/prompts/output/${output}` },
  };
}

export default async function OutputPage({ params }: PageProps) {
  const { output } = await params;
  const o = resolve(output);
  if (!o) notFound();

  const items = prompts.filter((p) => p.outputType === o);
  const bySource = sourceTypes
    .map((s) => ({ source: s, n: items.filter((p) => p.sources.includes(s)).length }))
    .filter((x) => x.n > 0);

  return (
    <main className="plib">
      <SiteHeader />
      <div className="wrap detail">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/prompts">Prompt library</Link>
          <span>/</span>
          <span>{o}</span>
        </nav>
        <section className="plib-hero" style={{ paddingTop: 12 }}>
          <h1>Produce a {o.toLowerCase()} from what you already saved.</h1>
          <div className="plib-hero-row">
            <div className="plib-nums">
              <div>
                <b>{items.length}</b>
                <span>Prompts</span>
              </div>
              <div>
                <b>{bySource.length}</b>
                <span>Source types</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="plib-head">
            <h2>Start from</h2>
          </div>
          <div className="plib-chips">
            {bySource.map(({ source, n }) => (
              <Link key={source} className="plib-chip" href={`/prompts/source/${toSlug(source)}`}>
                <b>{source}</b>
                <em>{n}</em>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="plib-head">
            <h2>All {o.toLowerCase()} prompts</h2>
            <Link href="/prompts">Whole library →</Link>
          </div>
          <PromptCards items={items} />
        </section>

        <section className="plib-index">
          <div className="plib-index-cols">
            <div>
              <h3>Other output types</h3>
              <ul>
                {outputTypes
                  .filter((x) => x !== o)
                  .map((x) => (
                    <li key={x}>
                      <Link href={`/prompts/output/${toSlug(x)}`}>
                        {x}
                        <em>{prompts.filter((p) => p.outputType === x).length}</em>
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
          <h2>Bring the sources. Ancher shapes the {o.toLowerCase()}.</h2>
          <a className="primary-button" href={signupUrl}>
            Create with Ancher <span>→</span>
          </a>
        </section>
        <footer className="footer">
          <span>© 2026 Ancher</span>
          <span>Source-grounded work, ready to use.</span>
        </footer>
      </div>
    </main>
  );
}
