import { getDb, schema } from "../../../../db";
import { checkAuth, pipelineEnv } from "../_auth";

export const dynamic = "force-dynamic";

/**
 * Step 1 of the PSEO pipeline: pull Google Trends' daily trending RSS.
 *
 * There is no official Trends API. The RSS feed is the only stable public
 * surface, so that is what this reads. Scoring each term for relevance is a
 * separate step — this endpoint only collects, it does not judge.
 *
 *   curl -X POST https://ancher.us/api/pipeline/trends \
 *     -H "Authorization: Bearer $PIPELINE_TOKEN" \
 *     -H "content-type: application/json" -d '{"geos":["US"]}'
 */
export async function POST(request: Request) {
  const env = await pipelineEnv();
  const denied = checkAuth(request, env);
  if (denied) return denied;

  const body = (await request.json().catch(() => ({}))) as {
    geos?: string[];
    hours?: number;
    persist?: boolean;
  };
  const geos = body.geos?.length ? body.geos : ["US"];
  const hours = body.hours ?? 24;
  const db = body.persist === false ? null : await getDb();

  const items: Array<{
    term: string;
    geo: string;
    feed: string;
    traffic: string | null;
    headlines: string[];
  }> = [];
  const errors: string[] = [];

  for (const geo of geos) {
    const feed = `${geo}/${hours}h`;
    try {
      const res = await fetch(
        `https://trends.google.com/trending/rss?geo=${encodeURIComponent(geo)}&hours=${hours}`,
        {
          headers: {
            // Trends serves an empty body to obviously-scripted clients.
            "user-agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
            accept: "application/rss+xml, application/xml;q=0.9, */*;q=0.8",
          },
        },
      );
      if (!res.ok) {
        errors.push(`${geo}: HTTP ${res.status}`);
        continue;
      }
      for (const item of parseRss(await res.text())) {
        items.push({ ...item, geo, feed });
      }
    } catch (err) {
      errors.push(`${geo}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (db && items.length) {
    await db.insert(schema.trends).values(items);
  }

  return Response.json({
    pulledAt: new Date().toISOString(),
    persisted: Boolean(db),
    count: items.length,
    items,
    errors,
  });
}

/** Minimal RSS reader — the Trends feed is small and predictable. */
function parseRss(xml: string) {
  const out: Array<{ term: string; traffic: string | null; headlines: string[] }> = [];
  for (const [, block] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const term = text(block, "title");
    if (!term) continue;
    out.push({
      term: term.toLowerCase(),
      traffic: text(block, "ht:approx_traffic"),
      headlines: [...block.matchAll(/<ht:news_item_title>([\s\S]*?)<\/ht:news_item_title>/g)]
        .map((m) => decode(m[1]))
        .filter(Boolean),
    });
  }
  return out;
}

function text(block: string, tag: string): string | null {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1]) : null;
}

function decode(raw: string): string {
  return raw
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}
