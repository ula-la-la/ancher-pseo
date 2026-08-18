"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { OutputThumb } from "./PaperMotif";
import type { OutputType, Prompt } from "../data/prompts";

/**
 * Section 06 — the searchable library.
 *
 * Filtering is client-side over the full array, which means every prompt is
 * still in the server-rendered HTML. A crawler sees all of them; only the
 * display is interactive.
 */
export function PromptGrid({
  prompts,
  outputTypes,
}: {
  prompts: Prompt[];
  outputTypes: readonly OutputType[];
}) {
  const [active, setActive] = useState<OutputType | "All">("All");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    prompts.forEach((p) => map.set(p.outputType, (map.get(p.outputType) ?? 0) + 1));
    return map;
  }, [prompts]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prompts.filter((p) => {
      if (active !== "All" && p.outputType !== active) return false;
      if (!q) return true;
      return [p.title, p.outputType, p.summary, p.keyword, p.sources.join(" "), p.body]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [prompts, active, query]);

  async function copy(prompt: Prompt) {
    try {
      await navigator.clipboard.writeText(prompt.body);
      setCopied(prompt.slug);
      setTimeout(() => setCopied((c) => (c === prompt.slug ? null : c)), 1600);
    } catch {
      // Clipboard is unavailable (insecure context, or permission denied).
      // The prompt is still readable on its own page, so fail quietly.
    }
  }

  return (
    <>
      <div className="plib-head">
        <h2>
          <em>06</em> The library
        </h2>
        <label className="plib-search" style={{ height: 42, width: "min(320px,100%)" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts…"
            aria-label="Search prompts"
          />
        </label>
      </div>

      <div className="plib-filters" role="group" aria-label="Filter by output type">
        <button aria-pressed={active === "All"} onClick={() => setActive("All")}>
          All<i>{prompts.length}</i>
        </button>
        {outputTypes.map((o) => (
          <button key={o} aria-pressed={active === o} onClick={() => setActive(o)}>
            {o}
            <i>{counts.get(o) ?? 0}</i>
          </button>
        ))}
      </div>

      <div className="plib-grid">
        {visible.map((p) => (
          <div key={p.slug} className="plib-card">
            <Link href={`/prompts/${p.slug}`} aria-label={p.title}>
              <OutputThumb outputType={p.outputType} />
              <div className="plib-card-body">
                <h3>{p.title}</h3>
                <p className="sub">{p.sources.join(" · ")}</p>
                <div className="foot">
                  <span>{p.outputType}</span>
                  <span className="kw">{p.keyword}</span>
                </div>
              </div>
            </Link>
            <div className="plib-peek">
              <p>{p.body}</p>
              <button type="button" onClick={() => copy(p)}>
                {copied === p.slug ? "Copied" : "Copy prompt"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && <p className="plib-empty">Nothing matches that.</p>}
    </>
  );
}
