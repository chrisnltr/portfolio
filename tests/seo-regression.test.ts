import { describe, expect, it } from "vitest";
import { projects } from "~/data/projects";
import {
  DEFAULT_OG_IMAGE,
  getProjectSocialImage,
  portfolioJsonLd,
  projectPortfolioJsonLd,
} from "~/data/seo";

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
});
