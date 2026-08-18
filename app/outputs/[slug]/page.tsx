import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { galleryItems, getGalleryItem } from "../../data/gallery";
import { getUseCasesFor } from "../../data/useCases";
import { OutputPreview } from "../../components/OutputPreview";
import { SiteHeader } from "../../components/SiteHeader";
import { appUrl, siteUrl } from "../../site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return galleryItems.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getGalleryItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.metaDescription,
    alternates: { canonical: `/outputs/${item.slug}` },
    robots: item.status === "ready" ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function OutputPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getGalleryItem(slug);
  if (!item) notFound();
  const related = galleryItems.filter((candidate) => candidate.category === item.category && candidate.slug !== item.slug).slice(0, 3);
  const audiences = getUseCasesFor(item.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: item.title,
    description: item.metaDescription,
    // Schema.org URLs must be absolute; relative values are silently dropped.
    url: `${siteUrl}/outputs/${item.slug}`,
    isPartOf: { "@type": "CollectionPage", name: "Ancher Output Gallery", url: siteUrl },
    about: item.primaryKeyword,
    audience: audiences.map((useCase) => ({ "@type": "Audience", audienceType: useCase.name })),
  };

  return <main><SiteHeader />
    <div className="detail wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Output Gallery</Link><span>/</span><span>{item.category}</span></nav>
      <section className="detail-hero">
        <div className="detail-preview"><OutputPreview item={item} large /><div className="preview-count">Output preview will appear here after upload</div></div>
        <div className="detail-copy"><p className="kicker"><span /> {item.outputType}</p><h1>{item.h1}</h1><p className="detail-lede">{item.description}</p><div className="meta-row"><span>{item.outputType}</span><i /> <span>Editable output</span><i /> <span>Source-grounded</span></div>
        {audiences.length > 0 && <div className="source-chips audience-chips"><span className="chips-label">Built for</span>{audiences.map((useCase) => <Link key={useCase.slug} href={`/for/${useCase.slug}`}><span>{useCase.name}</span></Link>)}</div>}
        <a className="primary-button wide" href={appUrl}>Create this output <span>→</span></a><p className="draft-note"><b>Preview pending.</b> The finished Ancher output will be added before this page is indexed.</p></div>
      </section>
      <section className="detail-info">
        <article><p className="section-label">About this output</p><h2>A finished deliverable, grounded in your own knowledge.</h2><p>{item.description}</p><p>Instead of starting with a blank template, Ancher reads the materials you provide, identifies the important evidence and relationships, and shapes them into a coherent {item.outputType.toLowerCase()}.</p></article>
        <aside><p className="section-label">What’s included</p><ol>{item.included.map((entry) => <li key={entry}><span>{String(item.included.indexOf(entry) + 1).padStart(2, "0")}</span>{entry}</li>)}</ol></aside>
      </section>
      <section className="source-panel"><div><p className="section-label">What to provide</p><h2>Bring the source material. Ancher shapes the output.</h2></div><p>{item.sourceRequirements}</p><div className="source-chips"><span>Documents</span><span>Notes</span><span>Links</span><span>Research</span></div></section>
      {related.length > 0 && <section className="related"><div className="section-heading"><h2>Related outputs</h2><Link href="/">View all →</Link></div><div className="related-grid">{related.map((candidate) => <Link key={candidate.slug} href={`/outputs/${candidate.slug}`}><OutputPreview item={candidate} /><div><h3>{candidate.title}</h3><p>{candidate.outputType}</p></div></Link>)}</div></section>}
    </div>
    <section className="bottom-cta wrap"><span className="spark">✦</span><h2>Turn saved knowledge into finished work.</h2><p>Bring your sources, notes, and ideas. Ancher turns them into an output you can use.</p><a className="primary-button" href="https://ancher.ai">Create with Ancher <span>→</span></a></section>
    <footer className="footer wrap"><span>© 2026 Ancher</span><span>Source-grounded work, ready to use.</span></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
