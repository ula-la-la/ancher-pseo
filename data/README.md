# Pipeline data

Snapshots from the 2026-08-18 pilot run. These are inputs to the page plan, not
build artifacts — the site does not read them at runtime.

| File | What it is |
| --- | --- |
| `01_trend_candidates_scored.csv` | All 34 Google Trends US terms pulled on 2026-08-18, scored 0–5 for relevance to Ancher's audiences |
| `02_pseo_page_plan.csv` | The 19 planned pages with full upload fields. `TBD_SEMRUSH` / `TBD_X_API` mark cells still waiting on data |
| `03_semrush_bulk_input.txt` | 83 keywords formatted for SEMrush → Keyword Overview → bulk analysis (US database) |
| `04_keyword_to_slug_map.csv` | Merges the SEMrush export back onto the right page |
| `pseo_pilot_plan.html` | Rendered view of the two tables above |

## Filling in the SEMrush columns

1. Paste `03_semrush_bulk_input.txt` into SEMrush Keyword Overview, database US.
2. Export the CSV.
3. Join on `keyword` using `04_keyword_to_slug_map.csv`, and write `volume`/`kd`
   into `app/data/gallery.ts` (`totalVolume`, `avgKd`), clearing `volumePending`.
