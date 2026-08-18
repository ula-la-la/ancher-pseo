import Link from "next/link";
import { OutputThumb } from "./PaperMotif";
import type { Prompt } from "../data/prompts";

/** Static (non-filterable) card grid, used by the source/output/pack pages. */
export function PromptCards({ items }: { items: Prompt[] }) {
  if (items.length === 0) {
    return <p className="plib-empty">No prompts here yet.</p>;
  }
  return (
    <div className="plib-grid">
      {items.map((p) => (
        <Link key={p.slug} className="plib-card" href={`/prompts/${p.slug}`}>
          <OutputThumb outputType={p.outputType} />
          <div className="plib-card-body">
            <h3>{p.title}</h3>
            <p className="sub">{p.summary}</p>
            <div className="foot">
              <span>{p.outputType}</span>
              <span className="kw">{p.keyword}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
