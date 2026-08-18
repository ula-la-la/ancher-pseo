import { sql } from "drizzle-orm";
import { index, integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

const now = sql`(unixepoch())`;

/** Step 1 — raw Google Trends pulls. One row per (term, pull). */
export const trends = sqliteTable(
  "trends",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    term: text("term").notNull(),
    geo: text("geo").notNull().default("US"),
    feed: text("feed").notNull(), // which RSS variant produced it
    traffic: text("traffic"), // Google's bucketed "200+" style value
    headlines: text("headlines", { mode: "json" }).$type<string[]>(),
    /** 0-5 relevance to Ancher's ICP, set by the scoring step. */
    ancherScore: integer("ancher_score"),
    scoreReason: text("score_reason"),
    pulledAt: integer("pulled_at").notNull().default(now),
  },
  (t) => [
    index("trends_term_idx").on(t.term),
    index("trends_pulled_idx").on(t.pulledAt),
    index("trends_score_idx").on(t.ancherScore),
  ],
);

/** Step 2 — keywords plus whatever SEMrush says about them. */
export const keywords = sqliteTable(
  "keywords",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    keyword: text("keyword").notNull(),
    database: text("database").notNull().default("us"),
    role: text("role").notNull().default("primary"), // primary | secondary
    pageSlug: text("page_slug"),
    volume: integer("volume"),
    kd: real("kd"),
    cpc: real("cpc"),
    competition: real("competition"),
    intent: text("intent"),
    /** Where the numbers came from: "semrush-csv" | "semrush-api" | null. */
    volumeSource: text("volume_source"),
    updatedAt: integer("updated_at").notNull().default(now),
  },
  (t) => [
    uniqueIndex("keywords_kw_db_idx").on(t.keyword, t.database),
    index("keywords_slug_idx").on(t.pageSlug),
  ],
);

/** Step 3 — what people are actually asking on X, per keyword. */
export const xInsights = sqliteTable(
  "x_insights",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    pageSlug: text("page_slug").notNull(),
    query: text("query").notNull(),
    tweetId: text("tweet_id").notNull(),
    author: text("author"),
    authorFollowers: integer("author_followers"),
    text: text("text").notNull(),
    isQuestion: integer("is_question", { mode: "boolean" }).notNull().default(false),
    likes: integer("likes").notNull().default(0),
    retweets: integer("retweets").notNull().default(0),
    replies: integer("replies").notNull().default(0),
    views: integer("views").notNull().default(0),
    url: text("url"),
    tweetedAt: integer("tweeted_at"),
    pulledAt: integer("pulled_at").notNull().default(now),
  },
  (t) => [
    uniqueIndex("x_slug_tweet_idx").on(t.pageSlug, t.tweetId),
    index("x_slug_idx").on(t.pageSlug),
    index("x_question_idx").on(t.isQuestion),
  ],
);

/**
 * Step 4 — the pages themselves. `app/data/gallery.ts` is the current source
 * of truth; this table is the migration target once the set outgrows a file.
 */
export const pages = sqliteTable(
  "pages",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    contentId: text("content_id").notNull(),
    track: text("track").notNull().default("B"), // A = trend-jack, B = evergreen
    priority: text("priority"),
    title: text("title").notNull(),
    h1: text("h1").notNull(),
    description: text("description").notNull(),
    metaDescription: text("meta_description").notNull(),
    primaryKeyword: text("primary_keyword").notNull(),
    secondaryKeywords: text("secondary_keywords", { mode: "json" }).$type<string[]>(),
    category: text("category").notNull(),
    outputType: text("output_type").notNull(),
    inputType: text("input_type"),
    useCases: text("use_cases", { mode: "json" }).$type<string[]>(),
    included: text("included", { mode: "json" }).$type<string[]>(),
    sourceRequirements: text("source_requirements"),
    pageFormat: text("page_format").notNull().default("html"),
    refreshCadence: text("refresh_cadence"),
    accent: text("accent").notNull().default("ochre"),
    /** pending = shell only, do not index; ready = output uploaded, indexable. */
    status: text("status").notNull().default("pending"),
    bodyHtml: text("body_html"),
    publishedAt: integer("published_at"),
    updatedAt: integer("updated_at").notNull().default(now),
  },
  (t) => [uniqueIndex("pages_slug_idx").on(t.slug), index("pages_status_idx").on(t.status)],
);
