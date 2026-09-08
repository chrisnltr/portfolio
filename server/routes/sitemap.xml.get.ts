import { setResponseHeader } from "h3";
import type { H3Event } from "h3";
import { projects } from "~/data/projects";

function getOrigin(event: H3Event) {
  const envUrl = process.env.NUXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  const host = event.node.req.headers.host || "localhost:3000";
  const protoHeader = event.node.req.headers["x-forwarded-proto"];
  const proto = Array.isArray(protoHeader) ? protoHeader[0] : protoHeader || "http";
  return `${proto}://${host}`;
}

function urlEntry(
  base: string,
  path: string,
) {
  return `  <url>\n    <loc>${base}${path}</loc>\n  </url>`;
}

export default defineEventHandler((event) => {
  const base = getOrigin(event);

  const staticPages = ["/", "/datenschutz", "/impressum", "/agb", "/lebenslauf"]
    .map((path) => urlEntry(base, path))
    .join("\n");

  const projectUrls = projects
    .map((project) => urlEntry(base, `/projekte/${project.routeSlug}`))
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages}
${projectUrls}
</urlset>`;

  setResponseHeader(event, "Content-Type", "application/xml");
  setResponseHeader(event, "Cache-Control", "public, max-age=3600");
  return sitemap;
});
