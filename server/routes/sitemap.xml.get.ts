import { setResponseHeader } from "h3";

const LOCALES = ["de", "en"] as const;

function getOrigin(event: { node: { req: { headers: { [key: string]: string | undefined } } } }) {
  const envUrl = process.env.NUXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  const host = event.node.req.headers.host || "localhost:3000";
  const proto = event.node.req.headers["x-forwarded-proto"] || "http";
  return `${proto}://${host}`;
}

export default defineEventHandler((event) => {
  const base = getOrigin(event);

  const urls = LOCALES.map(
    (locale) =>
      `  <url>\n    <loc>${base}/${locale}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>`,
  ).join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  setResponseHeader(event, "Content-Type", "application/xml");
  setResponseHeader(event, "Cache-Control", "public, max-age=3600");
  return sitemap;
});
