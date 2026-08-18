import type { GalleryItem } from "../data/gallery";

export function OutputPreview({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  return (
    <div className={`output-preview ${item.accent} ${large ? "large" : ""}`} aria-label={`${item.outputType} preview pending`}>
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
      <span className="pending-label">Preview pending</span>
    </div>
  );
}
