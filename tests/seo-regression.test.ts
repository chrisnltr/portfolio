import { describe, expect, it } from "vitest";
import { projects } from "~/data/projects";
import { getPublicSitemapUrls, staticPublicPaths } from "~/data/publicRoutes";
import {
  DEFAULT_OG_IMAGE,
  getProjectSocialImage,
  portfolioJsonLd,
  projectPortfolioJsonLd,
  homeSeo,
  resumeSeo,
  imprintSeo,
  privacySeo,
  termsSeo,
  thankYouSeo,
} from "~/data/seo";
import {
  CANONICAL_SITE_ORIGIN,
  resolveSiteOrigin,
} from "~/utils/siteOrigin";

describe("SEO regression data", () => {
  it("keeps every published project addressable and unique", () => {
    const routes = projects.map((project) => project.routeSlug);
    expect(new Set(routes).size).toBe(projects.length);
    expect(routes).toEqual([
      "cantus-halle",
      "ls-aktivstall",
      "stallzentrale",
      "crashreport",
      "hardware-management",
      "crispy-billiards",
    ]);
    for (const project of projects) {
      expect(project.content.seoTitle).toContain(project.content.title);
      expect(project.content.seoDescription.length).toBeGreaterThan(40);
    }
  });

  it("emits parseable graph JSON-LD with stable entity IDs", () => {
    const origin = "https://chrisnoltemeier.de";
    const home = portfolioJsonLd(origin, "/");
    const project = projectPortfolioJsonLd(
      origin,
      "/projekte/cantus-halle",
      projects[0],
    );

    expect(() => JSON.parse(JSON.stringify(home))).not.toThrow();
    expect(() => JSON.parse(JSON.stringify(project))).not.toThrow();
    expect(JSON.stringify(project)).toContain(
      `${origin}/projekte/cantus-halle#project`,
    );
    expect(JSON.stringify(project)).not.toContain("Veranstaltungsort");
  });

  it("keeps the ProfessionalService relationship semantic and social images addressable", () => {
    const origin = "https://chrisnoltemeier.de";
    const home = portfolioJsonLd(origin, "/");
    const professionalService = home["@graph"].find(
      (node) => node["@type"] === "ProfessionalService",
    );

    expect(professionalService).toBeDefined();
    expect(professionalService).not.toHaveProperty("provider");
    expect(getProjectSocialImage(projects[0])).toBe(DEFAULT_OG_IMAGE);
    expect(projects.slice(1).every((project) => Boolean(project.socialImage))).toBe(true);
  });

  it("lists only public canonical URLs in the sitemap", () => {
    const urls = getPublicSitemapUrls(CANONICAL_SITE_ORIGIN);
    expect(urls).toEqual([
      "https://chrisnoltemeier.de/",
      "https://chrisnoltemeier.de/kontakt",
      "https://chrisnoltemeier.de/lebenslauf",
      "https://chrisnoltemeier.de/impressum",
      "https://chrisnoltemeier.de/datenschutz",
      "https://chrisnoltemeier.de/agb",
      "https://chrisnoltemeier.de/projekte/cantus-halle",
      "https://chrisnoltemeier.de/projekte/ls-aktivstall",
      "https://chrisnoltemeier.de/projekte/stallzentrale",
      "https://chrisnoltemeier.de/projekte/crashreport",
      "https://chrisnoltemeier.de/projekte/hardware-management",
      "https://chrisnoltemeier.de/projekte/crispy-billiards",
    ]);
    expect(urls.every((url) => url.startsWith(CANONICAL_SITE_ORIGIN))).toBe(
      true,
    );
    expect(urls.some((url) => url.includes("www."))).toBe(false);
    expect(urls.some((url) => url.includes("/api/"))).toBe(false);
    expect(urls.some((url) => url.includes("/danke"))).toBe(false);
    expect(staticPublicPaths).not.toContain("/danke");
  });

  it("normalizes www and empty origins to the canonical domain", () => {
    expect(resolveSiteOrigin("https://www.chrisnoltemeier.de")).toBe(
      CANONICAL_SITE_ORIGIN,
    );
    expect(resolveSiteOrigin("https://chrisnoltemeier.de/")).toBe(
      CANONICAL_SITE_ORIGIN,
    );
    expect(resolveSiteOrigin("")).toBe(CANONICAL_SITE_ORIGIN);
    expect(resolveSiteOrigin("http://localhost:3000")).toBe(
      "http://localhost:3000",
    );
  });

  it("keeps unique SEO titles and descriptions for public pages", () => {
    const copies = [
      homeSeo,
      resumeSeo,
      imprintSeo,
      privacySeo,
      termsSeo,
      thankYouSeo,
      ...projects.map((project) => ({
        title: project.content.seoTitle,
        description: project.content.seoDescription,
      })),
    ];
    const titles = copies.map((copy) => copy.title);
    const descriptions = copies.map((copy) => copy.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });
});
