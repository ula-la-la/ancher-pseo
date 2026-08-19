import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { galleryItems, getGalleryItem } from "../../data/gallery";
import { galleryExamples } from "../../data/galleryExamples";
import { galleryPrompts } from "../../data/galleryPrompts";
import { getUseCasesFor } from "../../data/useCases";
import { CopyPrompt } from "../../components/CopyPrompt";
import { OutputPreview } from "../../components/OutputPreview";
import { SiteHeader } from "../../components/SiteHeader";
import { siteUrl, signupUrl } from "../../site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return galleryItems.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getGalleryItem(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.metaDescription,
    alternates: { canonical: `/templates/${item.slug}` },
    robots: item.status === "ready" ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function OutputPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getGalleryItem(slug);
  if (!item) notFound();
  const example = galleryExamples[item.slug];
  const prompt = galleryPrompts[item.slug as keyof typeof galleryPrompts];
  const related = galleryItems.filter((candidate) => candidate.category === item.category && candidate.slug !== item.slug).slice(0, 3);
  const audiences = getUseCasesFor(item.slug);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: item.title,
    description: item.metaDescription,
    // Schema.org URLs must be absolute; relative values are silently dropped.
    url: `${siteUrl}/templates/${item.slug}`,
    isPartOf: { "@type": "CollectionPage", name: "Ancher Template Gallery", url: siteUrl },
    about: item.primaryKeyword,
    audience: audiences.map((useCase) => ({ "@type": "Audience", audienceType: useCase.name })),
  };

  return <main><SiteHeader />
    <div className="detail wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Template Gallery</Link><span>/</span><span>{item.category}</span></nav>
      <section className="detail-hero">
        <div className="detail-preview"><OutputPreview item={item} large priority /><div className="preview-count">{prompt ? `Original prompt · @${prompt.source.author} · ${prompt.source.publishedAt}` : example ? `${example.sources.length} X sources · refreshed ${example.pulledAt}` : "Output preview will appear here after upload"}</div></div>
        <div className="detail-copy"><p className="kicker"><span /> {item.outputType}</p><h1>{item.h1}</h1><p className="detail-lede">{item.description}</p><div className="meta-row"><span>{item.outputType}</span><i /> <span>Editable output</span><i /> <span>Source-grounded</span></div>
        {audiences.length > 0 && <div className="source-chips audience-chips"><span className="chips-label">Built for</span>{audiences.map((useCase) => <Link key={useCase.slug} href={`/for/${useCase.slug}`}><span>{useCase.name}</span></Link>)}</div>}
        <a className="primary-button wide" href={signupUrl}>Create this template <span>→</span></a>{example ? <p className="draft-note ready-note"><b>Finished example.</b> Synthesized from public X sources with a traceable source trail.</p> : <p className="draft-note"><b>Preview pending.</b> The finished Ancher example will be added before this page is indexed.</p>}</div>
      </section>
      {prompt && <section className="template-prompt" id="template-prompt">
        <header className="template-prompt-header"><div><p className="section-label">The prompt</p><h2>{prompt.title}</h2><p>A directly usable prompt found in the original X post—not a workflow summary.</p></div><CopyPrompt text={prompt.body} /></header>
        <pre className="template-prompt-body">{prompt.body}</pre>
      </section>}
      <section className="detail-info">
        <article><p className="section-label">About this template</p><h2>A finished deliverable, grounded in your own knowledge.</h2><p>{item.description}</p><p>Instead of starting with a blank template, Ancher reads the materials you provide, identifies the important evidence and relationships, and shapes them into a coherent {item.outputType.toLowerCase()}.</p></article>
        <aside><p className="section-label">What’s included</p><ol>{item.included.map((entry) => <li key={entry}><span>{String(item.included.indexOf(entry) + 1).padStart(2, "0")}</span>{entry}</li>)}</ol></aside>
      </section>
      {example && <section className="finished-example" id="finished-example">
        <header className="example-header"><div><p className="section-label">Finished example</p><h2>{example.title}</h2></div><p>{example.summary}</p></header>
        <div className="example-method"><span>Research note</span><p>{example.methodology}</p></div>
        <div className="example-sections">{example.sections.map((section, index) => <article key={section.title}>
          <span>{String(index + 1).padStart(2, "0")}</span><div><h3>{section.title}</h3>{section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div>
        </article>)}</div>
        <div className="example-source-trail"><div className="source-trail-heading"><p className="section-label">Source trail</p><h2>{prompt ? "Original X post for this prompt" : "Public X posts used in this example"}</h2><p>{prompt ? "The original post is kept here with its author, media, and direct X link." : "These posts surface product signals and practitioner viewpoints. They are cited as inputs, not treated as independent verification of every claim."}</p></div>
          <div className="x-source-grid">{prompt ? <a key={`prompt-${prompt.source.tweetId}`} href={prompt.source.url} target="_blank" rel="noreferrer">
            <div className="x-source-author"><Image src={prompt.source.avatar} alt="" width={38} height={38} /><span><strong>@{prompt.source.author}</strong><small>{prompt.source.publishedAt}</small></span></div>
            <div className={`x-source-media media-count-${Math.min(prompt.source.images.length, 3)}`}>{prompt.source.images.map((image) => <span key={image.src}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 680px) 100vw, 42vw" /></span>)}</div>
            <p>{prompt.source.originalText.length > 320 ? `${prompt.source.originalText.slice(0, 320)}…` : prompt.source.originalText}</p><b>View original on X ↗</b>
          </a> : example.sources.map((source) => <a key={source.tweetId} href={source.url} target="_blank" rel="noreferrer">
            <div className="x-source-author"><Image src={source.avatar} alt="" width={38} height={38} /><span><strong>@{source.author}</strong><small>{source.publishedAt}</small></span></div>
            {source.images && <div className={`x-source-media media-count-${Math.min(source.images.length, 3)}`}>{source.images.map((image) => <span key={image.src}><Image src={image.src} alt={image.alt} fill sizes="(max-width: 680px) 100vw, 42vw" /></span>)}</div>}
            <p>{source.text}</p><b>View original on X ↗</b></a>)}</div>
        </div>
      </section>}
      <section className="source-panel"><div><p className="section-label">What to provide</p><h2>Bring the source material. Ancher shapes the template.</h2></div><p>{item.sourceRequirements}</p><div className="source-chips"><span>Documents</span><span>Notes</span><span>Links</span><span>Research</span></div></section>
      {related.length > 0 && <section className="related"><div className="section-heading"><h2>Related templates</h2><Link href="/">View all →</Link></div><div className="related-grid">{related.map((candidate) => <Link key={candidate.slug} href={`/templates/${candidate.slug}`}><OutputPreview item={candidate} /><div><h3>{candidate.title}</h3><p>{candidate.outputType}</p></div></Link>)}</div></section>}
    </div>
    <section className="bottom-cta wrap"><span className="spark">✦</span><h2>Turn saved knowledge into finished work.</h2><p>Bring your sources, notes, and ideas. Ancher turns them into a document you can use.</p><a className="primary-button" href={signupUrl}>Create with Ancher <span>→</span></a></section>
    <footer className="footer wrap"><span>© 2026 Ancher</span><span>Source-grounded work, ready to use.</span></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
