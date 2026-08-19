import Image from "next/image";
import type { GalleryItem } from "../data/gallery";
import { galleryExamples } from "../data/galleryExamples";
import { galleryPrompts } from "../data/galleryPrompts";

export function OutputPreview({ item, large = false, priority = false }: { item: GalleryItem; large?: boolean; priority?: boolean }) {
  const isReady = item.status === "ready";
  const prompt = galleryPrompts[item.slug as keyof typeof galleryPrompts];
  const coverImage = prompt?.source.images[0] ?? galleryExamples[item.slug]?.sources.flatMap((source) => source.images ?? [])[0];
  if (coverImage) return (
    <div className={`output-preview ready-output-preview ${item.accent} ${large ? "large" : ""}`} aria-label={`${item.outputType} finished example`}>
      <Image className="ready-preview-image" src={coverImage.src} alt={coverImage.alt} fill loading={priority ? "eager" : "lazy"} quality={priority ? 80 : 75} sizes={large ? "(max-width: 680px) 100vw, 60vw" : "(max-width: 680px) 100vw, 33vw"} />
      <span className="ready-preview-shade" />
      {!prompt && <div className="ready-preview-copy"><small>Source-grounded example</small><strong>{item.outputType}</strong></div>}
      <span className="pending-label finished-label">{prompt ? "Original prompt" : "Finished example"}</span>
    </div>
  );
  return (
    <div className={`output-preview ${item.accent} ${large ? "large" : ""}`} aria-label={`${item.outputType} ${isReady ? "finished example" : "preview pending"}`}>
      <div className="preview-sheet cover-sheet">
        <span className="sheet-eyebrow">ANCHER OUTPUT</span>
        <strong>{item.outputType}</strong>
        <span className="cover-rule" />
        <small>Generated from your sources</small>
        <div className="landscape-lines"><i /><i /><i /><i /></div>
      </div>
      {large && <>
        <div className="preview-sheet text-sheet"><span>Executive summary</span><i /><i /><i /><i /><i /><div className="mini-chart"><b /><b /><b /><b /></div></div>
        <div className="preview-sheet text-sheet"><span>Key findings</span><div className="matrix-dots"><b /><b /><b /><b /><b /></div><i /><i /><i /><i /></div>
      </>}
      <span className={`pending-label ${isReady ? "finished-label" : ""}`}>{isReady ? "Finished example" : "Preview pending"}</span>
    </div>
  );
}
