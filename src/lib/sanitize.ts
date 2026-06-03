export function sanitizeText(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .replace(/javascript:/gi, "")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const t = email.trim();
  if (t.length < 5 || t.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t);
}

export function sanitizePhone(phone: unknown): boolean {
  if (typeof phone !== "string") return false;
  const stripped = phone.replace(/[\s\-().]/g, "");
  return /^\+?[\d]{7,20}$/.test(stripped);
}

export function sanitizeDate(date: unknown): boolean {
  if (typeof date !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = new Date(date);
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const max = new Date(today);
  max.setFullYear(max.getFullYear() + 1);
  return d >= today && d <= max;
}
