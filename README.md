# ancher-pseo

Programmatic-SEO site for Ancher, served from **ancher.us**.

Canonical repository: **https://github.com/ula-la-la/ancher-pseo**. Do not use this workflow against another repository.

`ancher.ai` is a separate deployment on AWS CloudFront and is not touched by
anything in this repo. `ancher.us` is already on Cloudflare, so this Worker is
the only thing that ever answers for that hostname.

- **Framework:** Next.js 16 (App Router)
- **Runtime:** Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare)
- **Data:** `app/data/gallery.ts` today; D1 (`db/schema.ts`) once the page set outgrows a file

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # plain Next build (type-checks everything)
npm run cf:preview   # build for Workers and serve it locally through workerd
```

## X → Ancher Artifact workflow

The coworker-ready workflow is packaged inside this repository at
`.agents/skills/publish-x-artifacts/`. An Agent Skills-compatible coding agent
can trigger it with:

```text
Use $publish-x-artifacts. 開始執行剩餘 Artifact，先停在一次性人工審核。
```

Fresh-clone setup, required accounts, review gates, release commands, Sitemap
policy, and production checks are defined in
[the operator runbook](.agents/skills/publish-x-artifacts/references/operator-runbook.md).
The workflow never stores Ancher, GitHub, Cloudflare, or RapidAPI credentials in
the repository.

## Deploying

Two paths, both supported by the single `wrangler.jsonc` in this repo. Pick one.

### A. From your machine

```bash
npx wrangler login
npm run cf:deploy
```

### B. Git-connected (Workers Builds)

In the Cloudflare dashboard: **Workers & Pages → Create → Import a repository**,
pick `ula-la-la/ancher-pseo`, then set

| Field | Value |
| --- | --- |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx wrangler deploy` |
| Output directory | *(leave empty — `wrangler.jsonc` points at `.open-next/worker.js`)* |

Every push to `main` then builds and deploys automatically.

> Do **not** use Cloudflare Pages with `@cloudflare/next-on-pages`. That adapter
> is superseded; Workers + OpenNext is the supported path for Next.js.

### Pointing ancher.us at the Worker

The production routes for `ancher.us` and `www.ancher.us` are already declared
in `wrangler.jsonc`. Do not add `ancher.ai` or `app.ancher.ai`; they are outside
this repository.

---

## Repo layout

```
app/
  site.ts                    canonical origin (NEXT_PUBLIC_SITE_URL, default https://ancher.us)
  layout.tsx                 metadata, OG, favicon
  page.tsx                   gallery home
  robots.ts                  allows /outputs/ and /for/, blocks /api/
  sitemap.ts                 home + published Artifacts + Artifact-backed TA hubs
  data/
    gallery.ts               34 items (14 original + 20 from the PSEO pipeline)
    useCases.ts              the 6 audiences, and the slug -> audience mapping
  for/[useCase]/page.tsx     /for/founder, /for/investor, ... (6 audience hubs)
  templates/[slug]/page.tsx  one page per published Artifact
  prompts/                   public Prompt library; currently noindex
  api/pipeline/
    _auth.ts                 bearer-token gate shared by both endpoints
    trends/route.ts          step 1 — pull Google Trends RSS
    x/route.ts               step 3 — pull X discussion via twitter241
db/
  schema.ts                  D1 tables: trends, keywords, x_insights, pages
  index.ts                   Drizzle client (returns null when DB is unbound)
```

---

## The PSEO pipeline

```
Google Trends RSS  ->  relevance scoring  ->  SEMrush volume  ->  X discussion  ->  page
   /api/pipeline/trends      (manual/LLM)     (manual CSV)     /api/pipeline/x    gallery.ts
```

The two collection steps run **as Worker routes rather than as local scripts**,
because `trends.google.com` and `*.rapidapi.com` are both unreachable from the
sandboxes this repo is authored in. A deployed Worker has open egress, so the
Worker is the only place the whole pipeline can actually run.

### Enabling the endpoints

They are closed by default and return `503` until a token exists:

```bash
npx wrangler secret put PIPELINE_TOKEN            # any long random string
npx wrangler secret put TWITTER241_RAPIDAPI_KEY   # from twitter241.env
```

Then:

```bash
curl -X POST https://ancher.us/api/pipeline/trends \
  -H "Authorization: Bearer $PIPELINE_TOKEN" \
  -H "content-type: application/json" \
  -d '{"geos":["US"],"hours":24}'

curl -X POST https://ancher.us/api/pipeline/x \
  -H "Authorization: Bearer $PIPELINE_TOKEN" \
  -H "content-type: application/json" \
  -d '{"slugs":["notebooklm-alternatives"],"count":40}'
```

Pass `{"persist": false}` to get JSON back without writing to D1 — useful before
the database exists.

### Enabling D1

```bash
npx wrangler d1 create ancher-pseo     # paste database_id into wrangler.jsonc
npm run db:generate                    # drizzle migrations from db/schema.ts
npm run db:migrate:remote
```

Until then `getDb()` returns `null` and the public site renders entirely from
`app/data/gallery.ts`.

---

## SEO invariants

Three things here are deliberate. Changing them will cost traffic.

1. **Artifact pages enter Sitemap only after the Artifact is approved, public,
   registered, and backed by a real screenshot.** Hidden jobs are excluded from
   route generation and public navigation.
2. **A `/for/<audience>` page enters Sitemap only when it contains at least one
   public Artifact card.**
3. **The 54 Prompt-library URLs remain accessible but use `noindex, follow` and
   stay out of Sitemap until they directly contain approved X provenance and
   completed Artifact value.**
4. **`robots.ts` allows crawlers to read page-level directives.** Do not block a
   noindex page in robots.txt, or Google cannot read its noindex instruction.

## Track A vs Track B

Items carry a `track` field.

- **`A-*`** — trend-jacking, sourced from a dated Google Trends pull. Short
  shelf life (~48h of peak interest), needs a refresh cadence, `trendSource`
  records where it came from.
- **`B-*`** — evergreen clusters (comparisons, how-tos, templates). These are
  what actually compound. `refreshCadence` says how often to revisit.

On the 2026-08-18 pull, only 4 of 34 trending terms scored ≥3 for relevance to
Ancher's audiences — roughly a 12% hit rate. Track B exists because of that
number.
