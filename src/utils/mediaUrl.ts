/**
 * Image URLs from the API are often relative (`/uploads/...`). Prefix with the same
 * origin as `VITE_ONUKPA_API_BASE_URL` (e.g. `https://api.example.com` — no `/api` suffix).
 */
export function resolveMediaUrl(relativeOrAbsolute: string): string {
  if (!relativeOrAbsolute) return relativeOrAbsolute;
  if (relativeOrAbsolute.startsWith("http://") || relativeOrAbsolute.startsWith("https://")) {
    return relativeOrAbsolute;
  }
  const raw = (import.meta.env.VITE_ONUKPA_API_BASE_URL as string | undefined) || "";
  const base = raw.replace(/\/$/, "");
  if (!base) return relativeOrAbsolute;
  const path = relativeOrAbsolute.startsWith("/") ? relativeOrAbsolute : `/${relativeOrAbsolute}`;
  return `${base}${path}`;
}
