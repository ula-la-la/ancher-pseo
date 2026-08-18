import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/SiteHeader";
import { OutputThumb } from "../../components/PaperMotif";
import { PromptCards } from "../../components/PromptCards";
import { CopyPrompt } from "../../components/CopyPrompt";
import { getPrompt, packs, prompts, toSlug } from "../../data/prompts";
import { getGalleryItem } from "../../data/gallery";
import { useCaseBySlug } from "../../data/useCases";
import { appUrl, siteUrl, signupUrl } from "../../site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return prompts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = getPrompt(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/prompts/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, url: `${siteUrl}/prompts/${p.slug}` },
  };
}

export default async function PromptPage({ params }: PageProps) {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt) notFound();

  const gallery = prompt.gallerySlug ? getGalleryItem(prompt.gallerySlug) : undefined;
  const inPacks = packs.filter((pk) => pk.steps.includes(prompt.slug));
  const related = prompts
    .filter((p) => p.slug !== prompt.slug && p.outputType === prompt.outputType)
    .slice(0, 4);

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: prompt.title,
    description: prompt.summary,
    url: `${siteUrl}/prompts/${prompt.slug}`,
    supply: prompt.sources.map((s) => ({ "@type": "HowToSupply", name: s })),
    step: [{ "@type": "HowToStep", text: prompt.body }],
  };

  return (
    <main className="plib">
      <SiteHeader />
      <div className="wrap detail">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/prompts">Prompt library</Link>
          <span>/</span>
          <Link href={`/prompts/output/${toSlug(prompt.outputType)}`}>{prompt.outputType}</Link>
          <span>/</span>
          <span>{prompt.title}</span>
        </nav>

        <section className="detail-hero">
          <div className="detail-copy">
            <p className="kicker">
              <span /> {prompt.outputType}
            </p>
            <h1>{prompt.title}</h1>
            <p className="detail-lede">{prompt.summary}</p>

            <div className="source-chips" style={{ margin: "22px 0" }}>
              <span className="chips-label">Sources</span>
              {prompt.sources.map((s) => (
                <Link key={s} href={`/prompts/source/${toSlug(s)}`}>
                  <span>{s}</span>
                </Link>
              ))}
            </div>
            <div className="source-chips" style={{ marginBottom: 26 }}>
              <span className="chips-label">Built for</span>
              {prompt.audiences.map((a) => (
                <Link key={a} href={`/for/${a}`}>
                  <span>{useCaseBySlug.get(a)?.name ?? a}</span>
                </Link>
              ))}
            </div>

            <CopyPrompt text={prompt.body} />
          </div>

          <div className="detail-preview">
            <OutputThumb outputType={prompt.outputType} />
            <p className="preview-count">Added {prompt.addedAt}</p>
          </div>
        </section>

        <section className="detail-info" style={{ gridTemplateColumns: "1.4fr .8fr" }}>
          <article>
            <p className="section-label">The prompt</p>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                font: "13px/1.75 ui-monospace, SFMono-Regular, Menlo, monospace",
                color: "#c3c5c6",
                background: "#0c0d0e",
                border: "1px solid #232527",
                borderLeft: "2px solid #4b2616",
                borderRadius: 8,
                padding: "20px 22px",
                margin: 0,
              }}
            >
              {prompt.body}
            </pre>
          </article>
          <aside>
            <p className="section-label">Target keyword</p>
            <p style={{ color: "#c8c8c8", marginTop: 0 }}>{prompt.keyword}</p>
            {gallery && (
              <>
                <p className="section-label" style={{ marginTop: 28 }}>
                  Matching template
                </p>
                <Link href={`/templates/${gallery.slug}`} style={{ color: "var(--orange)", fontSize: 14 }}>
                  {gallery.title} →
                </Link>
              </>
            )}
            {inPacks.length > 0 && (
              <>
                <p className="section-label" style={{ marginTop: 28 }}>
                  Part of
                </p>
                {inPacks.map((pk) => (
                  <Link
                    key={pk.slug}
                    href={`/prompts/pack/${pk.slug}`}
                    style={{ display: "block", color: "var(--orange)", fontSize: 14, marginBottom: 6 }}
                  >
                    {pk.title} →
                  </Link>
                ))}
              </>
            )}
          </aside>
        </section>

        {related.length > 0 && (
          <section className="related">
            <div className="section-heading">
              <h2>More {prompt.outputType.toLowerCase()} prompts</h2>
              <Link href={`/prompts/output/${toSlug(prompt.outputType)}`}>View all →</Link>
            </div>
            <PromptCards items={related} />
          </section>
        )}
      </div>

      <div className="wrap">
        <section className="bottom-cta" style={{ paddingBlock: 22 }}>
          <span className="spark">✦</span>
          <h2>Run this against your own sources.</h2>
          <p>{prompt.summary}</p>
          <a className="primary-button" href={signupUrl}>
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
