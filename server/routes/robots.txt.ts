import { getMethod, setResponseHeader, setResponseStatus } from "h3";
import { CANONICAL_SITE_ORIGIN } from "~/utils/siteOrigin";

export default defineEventHandler((event) => {
  const method = getMethod(event);
  if (method !== "GET" && method !== "HEAD") {
    setResponseHeader(event, "Allow", "GET, HEAD");
    setResponseStatus(event, 405);
    return "Method Not Allowed";
  }

  const robots = `User-agent: *
Allow: /

# Internal / non-indexable surfaces
Disallow: /api/
Disallow: /danke

Sitemap: ${CANONICAL_SITE_ORIGIN}/sitemap.xml
`;

  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Cache-Control", "public, max-age=86400");
  return robots;
});
