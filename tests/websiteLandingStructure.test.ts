import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  websiteLandingConsultationPoints,
  websiteLandingProcessSteps,
  websiteLandingProjects,
  websiteLandingTestimonials,
} from "~/data/websiteLanding";
import { contactPath } from "~/data/navigation";

describe("website landing structure", () => {
  it("exposes anchor id website-projekte on the projects section component", () => {
    const source = readFileSync(
      resolve("components/landing/WebsiteProjectsSection.vue"),
      "utf8",
    );
    expect(source).toContain('id="website-projekte"');
  });

  it("links primary CTAs to kontakt with website preselection", () => {
    const hero = readFileSync(
      resolve("components/landing/WebsiteLandingHero.vue"),
      "utf8",
    );
    const consult = readFileSync(
      resolve("components/landing/FirstConsultationSection.vue"),
      "utf8",
    );
    const mainHeader = readFileSync(
      resolve("components/layout/MainHeader.vue"),
      "utf8",
    );
    const landingPage = readFileSync(
      resolve("pages/website-erstellen-lassen.vue"),
      "utf8",
    );

    for (const source of [hero, consult]) {
      expect(source).toContain("projekt: \"website\"");
      expect(source).toMatch(/contactPath|path:\s*contactPath/);
    }

    expect(landingPage).toContain("MainHeader");
    expect(mainHeader).toContain('projekt: "website"');
    expect(contactPath).toBe("/kontakt");
  });

  it("defines four process steps for the timeline", () => {
    expect(websiteLandingProcessSteps).toHaveLength(4);
    expect(websiteLandingProcessSteps.map((step) => step.id)).toEqual([
      "request",
      "call",
      "offer",
      "build",
    ]);
  });

  it("marks draft testimonials and limits landing projects to website showcase", () => {
    expect(websiteLandingTestimonials.every((item) => item.isDraft)).toBe(true);
    expect(websiteLandingProjects.map((p) => p.routeSlug)).toEqual([
      "cantus-halle",
      "stallzentrale",
    ]);
  });

  it("documents consultation talking points", () => {
    expect(websiteLandingConsultationPoints.length).toBeGreaterThanOrEqual(3);
  });
});
