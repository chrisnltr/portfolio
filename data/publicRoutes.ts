import { projects } from "~/data/projects";

/**
 * Public, indexable portfolio paths for the Google sitemap.
 * Excludes API, thank-you, redirects, hashes, and parameter URLs.
 */
export const staticPublicPaths = [
  "/",
  "/kontakt",
  "/lebenslauf",
  "/impressum",
  "/datenschutz",
  "/agb",
] as const;

export function getPublicSitemapPaths(): string[] {
  const projectPaths = projects.map(
    (project) => `/projekte/${project.routeSlug}`,
  );
  return [...staticPublicPaths, ...projectPaths];
}

export function getPublicSitemapUrls(
  origin: string = "https://chrisnoltemeier.de",
): string[] {
  const base = origin.replace(/\/$/, "");
  return getPublicSitemapPaths().map((path) => `${base}${path}`);
}
