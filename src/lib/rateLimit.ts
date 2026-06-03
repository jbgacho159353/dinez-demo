// In-memory sliding-window rate limiter.
// Resets on server restart — suitable for demo/single-instance deployments.
// For multi-instance production, replace with Redis-backed store.

const store = new Map<string, number[]>();

const ROUTE_CONFIGS: Record<string, { maxRequests: number; windowMs: number }> = {
  bookings: { maxRequests: 5, windowMs: 60 * 60 * 1000 },
  "booking-request": { maxRequests: 5, windowMs: 60 * 60 * 1000 },
  quotes: { maxRequests: 10, windowMs: 60 * 60 * 1000 },
  contact: { maxRequests: 3, windowMs: 60 * 60 * 1000 },
};

export function getIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "127.0.0.1";
}

export function checkRateLimit(
  ip: string,
  route: string
): { ok: boolean; remaining: number } {
  const cfg = ROUTE_CONFIGS[route] ?? { maxRequests: 5, windowMs: 60 * 60 * 1000 };
  const key = `${ip}:${route}`;
  const now = Date.now();
  const windowStart = now - cfg.windowMs;

  const timestamps = (store.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= cfg.maxRequests) {
    store.set(key, timestamps);
    return { ok: false, remaining: 0 };
  }

  timestamps.push(now);
  store.set(key, timestamps);
  return { ok: true, remaining: cfg.maxRequests - timestamps.length };
}
