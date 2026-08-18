import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { galleryItems } from "../../data/gallery";
import { getUseCase, useCases, useCasesBySlug } from "../../data/useCases";
import { OutputPreview } from "../../components/OutputPreview";
import { SiteHeader } from "../../components/SiteHeader";
import { appUrl, siteUrl } from "../../site";

type PageProps = { params: Promise<{ useCase: string }> };

export function generateStaticParams() {
  return useCases.map(({ slug }) => ({ useCase: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { useCase: slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return {};
  return {
    title: `Outputs for ${useCase.name}`,
    description: useCase.blurb,
    alternates: { canonical: `/for/${useCase.slug}` },
    openGraph: {
      title: `Ancher outputs for ${useCase.name}`,
      description: useCase.blurb,
      url: `${siteUrl}/for/${useCase.slug}`,
    },
  };
}

export default async function UseCasePage({ params }: PageProps) {
  const { useCase: slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();

  const items = galleryItems.filter((item) =>
    (useCasesBySlug[item.slug] ?? []).includes(useCase.slug),
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Ancher outputs for ${useCase.name}`,
    description: useCase.blurb,
    url: `${siteUrl}/for/${useCase.slug}`,
    hasPart: items.map((item) => ({
      "@type": "WebPage",
      name: item.title,
      url: `${siteUrl}/outputs/${item.slug}`,
    })),
  };

  return (
    <main>
      <SiteHeader />
      <div className="detail wrap">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Output Gallery</Link>
          <span>/</span>
          <span>{useCase.name}</span>
        </nav>

        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">
              <span /> For {useCase.name.toLowerCase()}
            </p>
            <h1>{useCase.headline}</h1>
            <p>{useCase.blurb}</p>
            <div className="source-line">
              <span>Typical sources</span>
              <b>{useCase.typicalSources}</b>
            </div>
            <a className="primary-button" href={`${appUrl}/use-cases/${useCase.slug}`}>
              See how {useCase.name.toLowerCase()} use Ancher <span>→</span>
            </a>
          </div>
        </section>

        <section className="gallery" id="outputs">
          <div className="section-heading">
            <h2>
              {items.length} output{items.length === 1 ? "" : "s"} for {useCase.name.toLowerCase()}
            </h2>
            <Link href="/">View all →</Link>
          </div>
          <div className="gallery-grid">
            {items.map((item) => (
              <Link key={item.slug} href={`/outputs/${item.slug}`} className="gallery-card">
                <OutputPreview item={item} />
                <div className="card-copy">
                  <div className="card-title-row">
                    <span className="type-icon">▤</span>
                    <h2>{item.title}</h2>
                  </div>
                  <p>{item.description}</p>
                  <div className="card-footer">
                    <span>{item.outputType}</span>
                    <span>View output →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="related">
          <div className="section-heading">
            <h2>Other audiences</h2>
          </div>
          <div className="source-chips">
            {useCases
              .filter((other) => other.slug !== useCase.slug)
              .map((other) => (
                <Link key={other.slug} href={`/for/${other.slug}`}>
                  <span>{other.name}</span>
                </Link>
              ))}
          </div>
        </section>
      </div>

      <section className="bottom-cta wrap">
        <span className="spark">✦</span>
        <h2>Turn saved knowledge into finished work.</h2>
        <p>{useCase.blurb}</p>
        <a className="primary-button" href={appUrl}>
          Create with Ancher <span>→</span>
        </a>
      </section>
      <footer className="footer wrap">
        <span>© 2026 Ancher</span>
        <span>Source-grounded work, ready to use.</span>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </main>
  );
}
