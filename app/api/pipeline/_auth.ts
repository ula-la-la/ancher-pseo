import { getCloudflareContext } from "@opennextjs/cloudflare";

export type PipelineEnv = {
  PIPELINE_TOKEN?: string;
  TWITTER241_RAPIDAPI_KEY?: string;
  DB?: D1Database;
};

export async function pipelineEnv(): Promise<PipelineEnv> {
  const { env } = await getCloudflareContext({ async: true });
  return env as PipelineEnv;
}

/**
 * These endpoints spend RapidAPI quota and write to D1, so they are closed by
 * default: without PIPELINE_TOKEN set they refuse every request rather than
 * falling open.
 *
 *   npx wrangler secret put PIPELINE_TOKEN
 *   npx wrangler secret put TWITTER241_RAPIDAPI_KEY
 */
export function checkAuth(request: Request, env: PipelineEnv): Response | null {
  if (!env.PIPELINE_TOKEN) {
    return Response.json(
      { error: "PIPELINE_TOKEN is not configured; pipeline endpoints are disabled." },
      { status: 503 },
    );
  }
  const header = request.headers.get("authorization") ?? "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!timingSafeEqual(supplied, env.PIPELINE_TOKEN)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
