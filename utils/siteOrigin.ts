/** Canonical production origin — never use www. */
export const CANONICAL_SITE_ORIGIN = "https://chrisnoltemeier.de";

/**
 * Normalizes a site origin for SEO.
 * `chrisnoltemeier.de` / `www.chrisnoltemeier.de` always map to the canonical HTTPS origin.
 * Other hosts (localhost, preview) keep their protocol and host.
 */
export function resolveSiteOrigin(value?: string | null): string {
  const raw = String(value || "")
    .trim()
    .replace(/\/$/, "");
  if (!raw) return CANONICAL_SITE_ORIGIN;

  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    const hostname = url.hostname.replace(/^www\./i, "").toLowerCase();
    if (hostname === "chrisnoltemeier.de") {
      return CANONICAL_SITE_ORIGIN;
    }
    return `${url.protocol}//${url.host}`.replace(/\/$/, "");
  } catch {
    return CANONICAL_SITE_ORIGIN;
  }
}
