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
  lastmod: string,
  changefreq: string,
  priority: string,
) {
  return `  <url>\n    <loc>${base}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export default defineEventHandler((event) => {
  const base = getOrigin(event);
  const lastmod = new Date().toISOString().slice(0, 10);

  const staticPages = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/datenschutz", changefreq: "monthly", priority: "0.5" },
    { path: "/impressum", changefreq: "monthly", priority: "0.5" },
    { path: "/agb", changefreq: "monthly", priority: "0.5" },
    { path: "/lebenslauf", changefreq: "monthly", priority: "0.6" },
  ]
    .map((entry) =>
      urlEntry(base, entry.path, lastmod, entry.changefreq, entry.priority),
    )
    .join("\n");

  const projectUrls = projects
    .map((project) =>
      urlEntry(
        base,
        `/projekte/${project.routeSlug}`,
        lastmod,
        "monthly",
        "0.7",
      ),
    )
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
