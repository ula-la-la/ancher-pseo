#!/usr/bin/env node
/**
 * fetch_x_insights.mjs — Step 3 of the Ancher PSEO pipeline.
 *
 * WHY THIS IS A SEPARATE SCRIPT: the Claude cloud container and the Cowork
 * desktop VM both sit behind an egress allowlist that blocks
 * *.rapidapi.com, so the X calls have to run somewhere with open network.
 * Run this on your own machine, then hand the JSON back to Claude.
 *
 * USAGE
 *   cp twitter241.env .env         # or export the var yourself
 *   node fetch_x_insights.mjs 02_pseo_page_plan.csv > x_insights.json
 *
 * Requires Node >= 18 (built-in fetch). No dependencies.
 */

import fs from "node:fs";
import path from "node:path";

// ---- config ---------------------------------------------------------------
const HOST = "twitter241.p.rapidapi.com";
const KEY =
  process.env.TWITTER241_RAPIDAPI_KEY ??
  (fs.existsSync(".env")
    ? (fs.readFileSync(".env", "utf8").match(/TWITTER241_RAPIDAPI_KEY=(.+)/) || [])[1]?.trim()
    : undefined);

if (!KEY) {
  console.error("Missing TWITTER241_RAPIDAPI_KEY (env var or .env in cwd).");
  process.exit(1);
}

const PLAN = process.argv[2] ?? "02_pseo_page_plan.csv";
const PER_QUERY = Number(process.env.PER_QUERY ?? 40);
const DELAY_MS = Number(process.env.DELAY_MS ?? 1200); // stay under the RapidAPI rate limit

// ---- tiny CSV reader (handles quoted fields) -------------------------------
function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
    else if (c !== "\r") cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const head = rows.shift().map((h) => h.replace(/^﻿/, "").trim());
  return rows.filter((r) => r.length > 1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

// ---- X search --------------------------------------------------------------
async function search(query, type) {
  const url = `https://${HOST}/search-v2?type=${type}&count=${PER_QUERY}&query=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: { "x-rapidapi-key": KEY, "x-rapidapi-host": HOST },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} :: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}

/** The twitter241 payload nests tweets in timeline instructions; dig them out. */
function extractTweets(payload) {
  const out = [];
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(walk);
    const legacy = node.legacy ?? node.tweet?.legacy;
    if (legacy?.full_text) {
      const user =
        node.core?.user_results?.result?.legacy ??
        node.tweet?.core?.user_results?.result?.legacy ?? {};
      out.push({
        id: legacy.id_str ?? node.rest_id ?? null,
        text: legacy.full_text,
        created_at: legacy.created_at ?? null,
        likes: legacy.favorite_count ?? 0,
        retweets: legacy.retweet_count ?? 0,
        replies: legacy.reply_count ?? 0,
        views: Number(node.views?.count ?? node.tweet?.views?.count ?? 0),
        author: user.screen_name ?? null,
        author_followers: user.followers_count ?? 0,
        url: user.screen_name && legacy.id_str
          ? `https://x.com/${user.screen_name}/status/${legacy.id_str}`
          : null,
      });
    }
    for (const v of Object.values(node)) walk(v);
  };
  walk(payload);
  // de-dupe by id, keep the most-engaged first
  const seen = new Set();
  return out
    .filter((t) => t.id && !seen.has(t.id) && seen.add(t.id))
    .sort((a, b) => b.likes + b.retweets - (a.likes + a.retweets));
}

/** Heuristic: which of these tweets are people *asking* something? */
const QUESTION_RE =
  /\?|^(how|what|why|when|which|where|who|does|do |is |are |can |should |any(one| recs| rec| tips)|looking for|best way|need a|recommend)/i;

// ---- main ------------------------------------------------------------------
const plan = parseCsv(fs.readFileSync(PLAN, "utf8")).filter((r) => r.xQuery);
const results = [];

for (const [i, row] of plan.entries()) {
  process.stderr.write(`[${i + 1}/${plan.length}] ${row.slug} … `);
  const entry = { slug: row.slug, primaryKeyword: row.primaryKeyword, query: row.xQuery, top: [], latest: [], errors: [] };
  for (const type of ["Top", "Latest"]) {
    try {
      const tweets = extractTweets(await search(row.xQuery, type));
      entry[type.toLowerCase()] = tweets.slice(0, 25);
    } catch (err) {
      entry.errors.push(`${type}: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, DELAY_MS));
  }
  const all = [...entry.top, ...entry.latest];
  entry.stats = {
    fetched: all.length,
    questions: all.filter((t) => QUESTION_RE.test(t.text)).length,
    total_engagement: all.reduce((s, t) => s + t.likes + t.retweets + t.replies, 0),
  };
  // the useful bit: what are people actually asking?
  entry.questions = all
    .filter((t) => QUESTION_RE.test(t.text))
    .slice(0, 15)
    .map((t) => ({ text: t.text, author: t.author, likes: t.likes, url: t.url }));
  results.push(entry);
  process.stderr.write(`${entry.stats.fetched} tweets, ${entry.stats.questions} questions\n`);
}

process.stdout.write(JSON.stringify({ pulledAt: new Date().toISOString(), results }, null, 2));
process.stderr.write(`\nDone. ${results.length} keywords. Send x_insights.json back to Claude.\n`);
