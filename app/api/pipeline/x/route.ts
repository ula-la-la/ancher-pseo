import { galleryItems } from "../../../data/gallery";
import { getDb, schema } from "../../../../db";
import { checkAuth, pipelineEnv } from "../_auth";

export const dynamic = "force-dynamic";

const HOST = "twitter241.p.rapidapi.com";

/**
 * Step 3 of the PSEO pipeline, run from the Worker.
 *
 * Why here and not from a laptop or CI: RapidAPI is unreachable from the
 * sandboxes we author in, but a Cloudflare Worker has open egress. Running it
 * here also means the results land straight in D1 on a schedule.
 *
 *   curl -X POST https://ancher.us/api/pipeline/x \
 *     -H "Authorization: Bearer $PIPELINE_TOKEN" \
 *     -H "content-type: application/json" \
 *     -d '{"slugs":["notebooklm-alternatives"],"types":["Top","Latest"]}'
 */
export async function POST(request: Request) {
  const env = await pipelineEnv();
  const denied = checkAuth(request, env);
  if (denied) return denied;

  if (!env.TWITTER241_RAPIDAPI_KEY) {
    return Response.json({ error: "TWITTER241_RAPIDAPI_KEY is not set." }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    slugs?: string[];
    types?: string[];
    count?: number;
    persist?: boolean;
  };
  const types = body.types?.length ? body.types : ["Top", "Latest"];
  const count = Math.min(Math.max(body.count ?? 40, 1), 100);
  const persist = body.persist !== false;

  const targets = galleryItems.filter(
    (item) => item.xQuery && (!body.slugs?.length || body.slugs.includes(item.slug)),
  );
  if (!targets.length) {
    return Response.json({ error: "No matching items with an xQuery." }, { status: 400 });
  }

  const db = persist ? await getDb() : null;
  const results: Array<Record<string, unknown>> = [];

  for (const item of targets) {
    const collected = new Map<string, Tweet>();
    const errors: string[] = [];

    for (const type of types) {
      try {
        const url =
          `https://${HOST}/search-v2?type=${encodeURIComponent(type)}` +
          `&count=${count}&query=${encodeURIComponent(item.xQuery!)}`;
        const res = await fetch(url, {
          headers: {
            "x-rapidapi-key": env.TWITTER241_RAPIDAPI_KEY,
            "x-rapidapi-host": HOST,
          },
        });
        if (!res.ok) {
          errors.push(`${type}: ${res.status} ${(await res.text()).slice(0, 200)}`);
          continue;
        }
        for (const tweet of extractTweets(await res.json())) {
          if (!collected.has(tweet.id)) collected.set(tweet.id, tweet);
        }
      } catch (err) {
        errors.push(`${type}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    const tweets = [...collected.values()].sort(
      (a, b) => b.likes + b.retweets - (a.likes + a.retweets),
    );
    const questions = tweets.filter((t) => t.isQuestion);

    if (db && tweets.length) {
      await db
        .insert(schema.xInsights)
        .values(
          tweets.slice(0, 100).map((t) => ({
            pageSlug: item.slug,
            query: item.xQuery!,
            tweetId: t.id,
            author: t.author,
            authorFollowers: t.authorFollowers,
            text: t.text,
            isQuestion: t.isQuestion,
            likes: t.likes,
            retweets: t.retweets,
            replies: t.replies,
            views: t.views,
            url: t.url,
            tweetedAt: t.tweetedAt,
          })),
        )
        .onConflictDoNothing();
    }

    results.push({
      slug: item.slug,
      primaryKeyword: item.primaryKeyword,
      query: item.xQuery,
      fetched: tweets.length,
      questionCount: questions.length,
      totalEngagement: tweets.reduce((s, t) => s + t.likes + t.retweets + t.replies, 0),
      topQuestions: questions.slice(0, 15).map((t) => ({
        text: t.text,
        author: t.author,
        likes: t.likes,
        url: t.url,
      })),
      errors,
    });
  }

  return Response.json({
    pulledAt: new Date().toISOString(),
    persisted: Boolean(db),
    results,
  });
}

// ---------------------------------------------------------------------------

type Tweet = {
  id: string;
  text: string;
  author: string | null;
  authorFollowers: number;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  url: string | null;
  tweetedAt: number | null;
  isQuestion: boolean;
};

const QUESTION_RE =
  /\?|^(how|what|why|when|which|where|who|does|do |is |are |can |should |any(one| recs| rec| tips)|looking for|best way|need a|recommend)/i;

/** twitter241 nests tweets inside timeline instructions; walk and collect. */
function extractTweets(payload: unknown): Tweet[] {
  const out: Tweet[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walk);
    const rec = node as Record<string, any>;
    const legacy = rec.legacy ?? rec.tweet?.legacy;
    if (legacy?.full_text) {
      const user =
        rec.core?.user_results?.result?.legacy ??
        rec.tweet?.core?.user_results?.result?.legacy ??
        {};
      const id: string | undefined = legacy.id_str ?? rec.rest_id;
      if (id) {
        const created = legacy.created_at ? Date.parse(legacy.created_at) : NaN;
        out.push({
          id,
          text: legacy.full_text,
          author: user.screen_name ?? null,
          authorFollowers: user.followers_count ?? 0,
          likes: legacy.favorite_count ?? 0,
          retweets: legacy.retweet_count ?? 0,
          replies: legacy.reply_count ?? 0,
          views: Number(rec.views?.count ?? rec.tweet?.views?.count ?? 0),
          url: user.screen_name ? `https://x.com/${user.screen_name}/status/${id}` : null,
          tweetedAt: Number.isNaN(created) ? null : Math.floor(created / 1000),
          isQuestion: QUESTION_RE.test(legacy.full_text),
        });
      }
    }
    for (const value of Object.values(rec)) walk(value);
  };
  walk(payload);
  return out;
}
