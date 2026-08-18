import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

/**
 * Returns a Drizzle client bound to the D1 database, or null when the binding
 * is absent (which is the normal state until `d1_databases` is uncommented in
 * wrangler.jsonc). Callers should degrade gracefully rather than throw — the
 * public site renders fine from app/data/gallery.ts without a database.
 */
export async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  const db = (env as { DB?: D1Database }).DB;
  if (!db) return null;
  return drizzle(db, { schema });
}

export { schema };
