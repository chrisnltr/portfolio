import { getMethod, setResponseHeader, setResponseStatus } from "h3";
import { getPublicSitemapPaths } from "~/data/publicRoutes";
import { CANONICAL_SITE_ORIGIN } from "~/utils/siteOrigin";

function urlEntry(loc: string) {
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}

export default defineEventHandler((event) => {
  const method = getMethod(event);
  if (method !== "GET" && method !== "HEAD") {
    setResponseHeader(event, "Allow", "GET, HEAD");
    setResponseStatus(event, 405);
    return "Method Not Allowed";
  }

  // Always emit production canonical URLs for Google (never www, preview, or request host).
  const base = CANONICAL_SITE_ORIGIN;
  const entries = getPublicSitemapPaths()
    .map((path) => urlEntry(`${base}${path}`))
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

  setResponseHeader(event, "Content-Type", "application/xml; charset=utf-8");
  setResponseHeader(event, "Cache-Control", "public, max-age=3600");
  // Googlebot often probes with HEAD first; a 404 here fails Search Console.
  return sitemap;
});
