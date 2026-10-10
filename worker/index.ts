/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import { buildMetricRollups } from "../db/rollups";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type RateBucket = { startedAt: number; count: number };
const rateBuckets = new Map<string, RateBucket>();
const RATE_POLICIES = [
  { prefix: "/api/collector/", limit: 600, windowMs: 60_000 },
  { prefix: "/api/platform/", limit: 120, windowMs: 60_000 },
  { prefix: "/api/", limit: 120, windowMs: 60_000 },
] as const;

function clientKey(request: Request) {
  return request.headers.get("cf-connecting-ip") ?? "unresolved-client";
}

function rateLimit(request: Request, pathname: string) {
  const policy = RATE_POLICIES.find((candidate) => pathname.startsWith(candidate.prefix));
  if (!policy) return null;
  const now = Date.now();
  const key = `${policy.prefix}:${clientKey(request)}`;
  const current = rateBuckets.get(key);
  const bucket = !current || now - current.startedAt >= policy.windowMs ? { startedAt: now, count: 0 } : current;
  bucket.count += 1;
  rateBuckets.set(key, bucket);
  const remaining = Math.max(0, policy.limit - bucket.count);
  const resetSeconds = Math.max(1, Math.ceil((bucket.startedAt + policy.windowMs - now) / 1000));
  if (bucket.count > policy.limit) {
    return new Response(JSON.stringify({ error: "Request rate exceeded", retryAfterSeconds: resetSeconds }), {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": String(resetSeconds),
        "x-ratelimit-limit": String(policy.limit),
        "x-ratelimit-remaining": "0",
      },
    });
  }
  return { limit: policy.limit, remaining, resetSeconds };
}

function secure(response: Response, rate?: { limit: number; remaining: number; resetSeconds: number } | null) {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-frame-options", "DENY");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");
  headers.set("permissions-policy", "camera=(), microphone=(), geolocation=()");
  headers.set("content-security-policy", "frame-ancestors 'none'; object-src 'none'; base-uri 'self'");
  headers.set("strict-transport-security", "max-age=31536000; includeSubDomains");
  if (rate) {
    headers.set("x-ratelimit-limit", String(rate.limit));
    headers.set("x-ratelimit-remaining", String(rate.remaining));
    headers.set("x-ratelimit-reset", String(rate.resetSeconds));
  }
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    (globalThis as typeof globalThis & { __NOCX_DB?: D1Database }).__NOCX_DB = env.DB;
    const url = new URL(request.url);
    const limited = rateLimit(request, url.pathname);
    if (limited instanceof Response) return secure(limited);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const imageResponse = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return secure(imageResponse, limited);
    }

    return secure(await handler.fetch(request, env, ctx), limited);
  },
  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) { ctx.waitUntil(buildMetricRollups(env.DB)); },
};

export default worker;
