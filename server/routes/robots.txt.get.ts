import { setResponseHeader } from "h3";

function getOrigin(event: { node: { req: { headers: { [key: string]: string | undefined } } } }) {
  const envUrl = process.env.NUXT_PUBLIC_SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  const host = event.node.req.headers.host || "localhost:3000";
  const proto = event.node.req.headers["x-forwarded-proto"] || "http";
  return `${proto}://${host}`;
}

export default defineEventHandler((event) => {
  const base = getOrigin(event);

  const sitemapUrl = base + "/sitemap.xml";
  const robots = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Cache-Control", "public, max-age=86400");
  return robots;
});
