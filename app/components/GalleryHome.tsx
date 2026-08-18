"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { featuredItem, galleryItems, type GalleryCategory } from "../data/gallery";
import { OutputPreview } from "./OutputPreview";
import { SiteHeader } from "./SiteHeader";
import { signupUrl } from "../site";

const categories: Array<"All templates" | GalleryCategory> = ["All templates", "Research", "Writing", "Slides", "Knowledge"];
const categoryIcon: Record<string, string> = { "All templates": "▣", Research: "▤", Writing: "✎", Slides: "▱", Knowledge: "◇" };

export function GalleryHome() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All templates");
  const visibleItems = useMemo(() => category === "All templates" ? galleryItems : galleryItems.filter((item) => item.category === category), [category]);

  return <main><SiteHeader />
    <section className="hero wrap">
      <div className="hero-copy"><p className="kicker"><span /> Template gallery</p><h1>From everything you<br />know, to work you can use.</h1><p>Explore finished work created from real sources, notes, and ideas.</p><a className="primary-button" href={signupUrl}>Create with Ancher <span>→</span></a></div>
      <Link className="featured-card" href={`/templates/${featuredItem.slug}`}>
        <OutputPreview item={featuredItem} />
        <div className="featured-copy"><p className="featured-label">Featured template</p><h2>{featuredItem.title}</h2><span className="content-type">{featuredItem.outputType}</span><p>{featuredItem.description}</p><div className="source-line"><span>Suggested sources</span><b>Market reports</b><b>Competitor pages</b><b>Internal notes</b></div><span className="view-link">View template <b>→</b></span></div>
      </Link>
    </section>

    <section className="gallery wrap" id="gallery">
      <div className="filters" role="tablist" aria-label="Filter outputs">
        {categories.map((item) => <button key={item} role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={category === item ? "selected" : ""}><span>{categoryIcon[item]}</span>{item}</button>)}
      </div>
      <div className="gallery-grid">
        {visibleItems.map((item) => <Link key={item.slug} href={`/templates/${item.slug}`} className="gallery-card">
          <OutputPreview item={item} />
          <div className="card-copy"><div className="card-title-row"><span className="type-icon">▤</span><h2>{item.title}</h2></div><p>{item.description}</p><div className="card-footer"><span>{item.category}</span><span>View template →</span></div></div>
        </Link>)}
      </div>
    </section>
    <section className="bottom-cta wrap"><span className="spark">✦</span><h2>Turn saved knowledge into finished work.</h2><p>Transform notes, sources, and ideas into polished outputs you can share, present, and act on.</p><a className="primary-button" href={signupUrl}>Create with Ancher <span>→</span></a></section>
    <footer className="footer wrap"><span>© 2026 Ancher</span><span>Source-grounded work, ready to use.</span></footer>
  </main>;
}
