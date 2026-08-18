import type { OutputType } from "../data/prompts";

/**
 * Small paper-sheet illustrations, one per output type. These give the prompt
 * cards something to look at — a directory of pure text reads as a wall.
 * They reuse the gallery's existing paper/accent palette.
 */

export const outputTint: Record<OutputType, string> = {
  "Research report": "ochre",
  Memo: "forest",
  Brief: "navy",
  Synthesis: "plum",
  "Slide deck": "rose",
  Comparison: "teal",
  Newsletter: "sunset",
  "Social post": "violet",
};

type Motif = "doc" | "chart" | "nodes" | "deck" | "table" | "post";

const outputMotif: Record<OutputType, Motif> = {
  "Research report": "doc",
  Memo: "doc",
  Brief: "chart",
  Synthesis: "nodes",
  "Slide deck": "deck",
  Comparison: "table",
  Newsletter: "post",
  "Social post": "post",
};

export function PaperMotif({ motif }: { motif: Motif }) {
  switch (motif) {
    case "deck":
      return (
        <div className="plib-sheet land">
          <i className="hd" />
          <div className="tiles">
            <div />
            <div />
          </div>
        </div>
      );
    case "table":
      return (
        <div className="plib-sheet land">
          <i className="hd" />
          <div className="cols">
            <div />
            <div />
          </div>
        </div>
      );
    case "post":
      return (
        <div className="plib-sheet land">
          <div className="avatar-row">
            <u />
            <i className="xs" style={{ margin: 0 }} />
          </div>
          <i />
          <i className="s" />
        </div>
      );
    case "chart":
      return (
        <div className="plib-sheet port">
          <i className="hd" />
          <i />
          <i className="s" />
          <div className="bars">
            <b style={{ height: "40%" }} />
            <b style={{ height: "72%" }} />
            <b style={{ height: "52%" }} />
            <b style={{ height: "90%" }} />
          </div>
        </div>
      );
    case "nodes":
      return (
        <div className="plib-sheet port">
          <i className="hd" />
          <div className="dots">
            {Array.from({ length: 6 }, (_, i) => (
              <b key={i} />
            ))}
          </div>
          <i className="s" />
        </div>
      );
    default:
      return (
        <div className="plib-sheet port">
          <i className="hd" />
          <i />
          <i className="s" />
          <i />
          <i className="xs" />
        </div>
      );
  }
}

export function OutputThumb({
  outputType,
  className = "",
}: {
  outputType: OutputType;
  className?: string;
}) {
  return (
    <div className={`plib-thumb ${outputTint[outputType]} ${className}`}>
      <PaperMotif motif={outputMotif[outputType]} />
    </div>
  );
}

export { outputMotif };
