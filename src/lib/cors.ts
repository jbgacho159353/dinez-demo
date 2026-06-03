const ALLOWED = new Set([
  "https://dinez.co.uk",
  "https://www.dinez.co.uk",
  "https://dinez-demo.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
  "http://localhost:3004",
]);

// null origin = same-origin browser request or server-to-server — allow
export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  return ALLOWED.has(origin);
}
