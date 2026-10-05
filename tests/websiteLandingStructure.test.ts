import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  websiteLandingClarityBenefits,
  websiteLandingClarityIllustration,
  websiteLandingConsultationPoints,
  websiteLandingFaqItems,
  websiteLandingProcessSteps,
  websiteLandingProjects,
  websiteLandingTestimonials,
} from "~/data/websiteLanding";
import { contactPath } from "~/data/navigation";

const landingPageSource = readFileSync(
  resolve("pages/website-erstellen-lassen.vue"),
  "utf8",
);
const faqSource = readFileSync(
  resolve("components/landing/WebsiteFaqSection.vue"),
  "utf8",
);
const finalCtaSource = readFileSync(
  resolve("components/landing/WebsiteFinalCta.vue"),
  "utf8",
);
const processSource = readFileSync(
  resolve("components/landing/WebsiteProcessSection.vue"),
  "utf8",
);
const problemScopeSource = readFileSync(
  resolve("components/landing/WebsiteProblemScopeSection.vue"),
  "utf8",
);
const homeSource = readFileSync(resolve("pages/index.vue"), "utf8");

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

    for (const source of [hero, consult, finalCtaSource]) {
      expect(source).toContain('projekt: "website"');
      expect(source).toMatch(/contactPath|path:\s*contactPath/);
    }

    expect(landingPageSource).toContain("MainHeader");
    expect(mainHeader).toContain('projekt: "website"');
    expect(contactPath).toBe("/kontakt");
  });

  it("defines four process steps with tab titles for navigation", () => {
    expect(websiteLandingProcessSteps).toHaveLength(4);
    expect(websiteLandingProcessSteps.map((step) => step.id)).toEqual([
      "request",
      "call",
      "offer",
      "build",
    ]);
    expect(websiteLandingProcessSteps.map((step) => step.tabTitle)).toEqual([
      "Projektanfrage",
      "Erstgespräch",
      "Empfehlung & Angebot",
      "Umsetzung & Livegang",
    ]);
  });

  it("marks draft testimonials and limits landing projects to website showcase", () => {
    expect(websiteLandingTestimonials.every((item) => item.isDraft)).toBe(true);
    expect(websiteLandingProjects.map((p) => p.routeSlug)).toEqual([
      "cantus-halle",
      "ls-aktivstall",
      "stallzentrale",
    ]);
  });

  it("documents consultation talking points", () => {
    expect(websiteLandingConsultationPoints.length).toBeGreaterThanOrEqual(3);
  });

  it("embeds FAQ and final CTA after consultation and removes their pink placeholder", () => {
    expect(landingPageSource).toContain("FirstConsultationSection");
    expect(landingPageSource).toContain("WebsiteFaqSection");
    expect(landingPageSource).toContain("WebsiteFinalCta");
    expect(landingPageSource).not.toContain("FAQ und finale Abschluss-CTA");

    const consultIndex = landingPageSource.indexOf("FirstConsultationSection");
    const faqIndex = landingPageSource.indexOf("<WebsiteFaqSection");
    const finalIndex = landingPageSource.indexOf("<WebsiteFinalCta");
    const footerIndex = landingPageSource.indexOf("<MainFooter");

    expect(consultIndex).toBeGreaterThan(-1);
    expect(faqIndex).toBeGreaterThan(consultIndex);
    expect(finalIndex).toBeGreaterThan(faqIndex);
    expect(footerIndex).toBeGreaterThan(finalIndex);
  });

  it("embeds problem/scope section before projects and removes its pink placeholder", () => {
    expect(landingPageSource).toContain("WebsiteProblemScopeSection");
    expect(landingPageSource).not.toContain(
      "Problemverständnis und konkreter Leistungsumfang",
    );
    expect(landingPageSource).not.toContain("UiVisualPlaceholder");

    const heroIndex = landingPageSource.indexOf("WebsiteLandingHero");
    const scopeIndex = landingPageSource.indexOf("<WebsiteProblemScopeSection");
    const projectsIndex = landingPageSource.indexOf("<WebsiteProjectsSection");

    expect(heroIndex).toBeGreaterThan(-1);
    expect(scopeIndex).toBeGreaterThan(heroIndex);
    expect(projectsIndex).toBeGreaterThan(scopeIndex);
  });

  it("replaces hero and consultation media placeholders with illustration components", () => {
    const consult = readFileSync(
      resolve("components/landing/FirstConsultationSection.vue"),
      "utf8",
    );
    const hero = readFileSync(
      resolve("components/landing/WebsiteLandingHero.vue"),
      "utf8",
    );
    const heroVisual = readFileSync(
      resolve("components/landing/WebsiteHeroVisual.vue"),
      "utf8",
    );
    const consultVisual = readFileSync(
      resolve("components/landing/ConsultationVisual.vue"),
      "utf8",
    );

    expect(hero).toContain("WebsiteHeroVisual");
    expect(hero).not.toContain("TEMPORÄRER HERO-ASSET-PLATZHALTER");
    expect(hero).not.toContain("UiVisualPlaceholder");
    expect(consult).toContain("ConsultationVisual");
    expect(consult).not.toContain("TEMPORÄRER MEDIEN-PLATZHALTER");
    expect(consult).not.toContain("UiVisualPlaceholder");
    expect(heroVisual).toContain("/images/website-hero-visual-transparent.png");
    expect(consultVisual).toContain("/images/erstgespraech-visual-transparent.png");
  });

  it("provides all planned FAQ questions with unique ids", () => {
    expect(websiteLandingFaqItems).toHaveLength(7);

    const questions = websiteLandingFaqItems.map((item) => item.question);
    expect(questions).toEqual([
      "Was kostet eine professionelle Website?",
      "Wie lange dauert die Erstellung einer Website?",
      "Müssen Texte und Bilder bereits fertig sein?",
      "Kann meine bestehende Domain weiterverwendet werden?",
      "Kann ich Inhalte später selbst bearbeiten?",
      "Erstellen Sie auch Onlineshops?",
      "Ist das Erstgespräch kostenlos und unverbindlich?",
    ]);

    const ids = websiteLandingFaqItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("uses accessible accordion buttons with aria attributes and unique id helpers", () => {
    expect(faqSource).toContain('type="button"');
    expect(faqSource).toContain(":aria-expanded=");
    expect(faqSource).toContain(":aria-controls=");
    expect(faqSource).toContain("website-faq-trigger-");
    expect(faqSource).toContain("website-faq-panel-");
    expect(faqSource).toContain("prefers-reduced-motion");
    expect(faqSource).toContain("Ihre Frage ist nicht dabei?");
    expect(faqSource).toContain("Kostenloses Erstgespräch starten");
    expect(faqSource).toContain("btn-cta");
    expect(faqSource).toContain('projekt: "website"');
    expect(faqSource).toMatch(/contactPath|path:\s*contactPath/);
  });

  it("points final CTA secondary link to website projects and primary to kontakt funnel", () => {
    expect(finalCtaSource).toContain("#website-projekte");
    expect(finalCtaSource).toContain('projekt: "website"');
    expect(finalCtaSource).toContain("Kostenloses Website-Erstgespräch starten");
    expect(finalCtaSource).toContain("Website-Projekte ansehen");
    expect(finalCtaSource).toContain(
      "Kostenlos · unverbindlich · dauert nur wenige Minuten",
    );
  });

  it("renders clarity two-column section with illustration and short benefits", () => {
    expect(websiteLandingClarityBenefits).toHaveLength(3);
    expect(websiteLandingClarityBenefits.map((item) => item.label)).toEqual([
      "Klar aufgebaut",
      "Für jedes Gerät gedacht",
      "Auf Ihr Ziel ausgerichtet",
    ]);
    expect(websiteLandingClarityIllustration.src).toBe(
      "/images/wireframe-to-clear-interface.png",
    );
    expect(websiteLandingClarityIllustration.alt).toContain(
      "unklaren Website zu einer übersichtlichen",
    );

    expect(problemScopeSource).toContain("Klarheit statt Komplexität");
    expect(problemScopeSource).toContain("Ihr Angebot. Auf den ersten Blick klar.");
    expect(problemScopeSource).toContain(
      "Welche Inhalte und Funktionen dafür sinnvoll sind, klären wir",
    );
    expect(problemScopeSource).toContain("websiteLandingClarityIllustration");
    expect(problemScopeSource).toContain(":src=\"illustration.src\"");
    expect(problemScopeSource).not.toContain("Ausgangslage");
    expect(problemScopeSource).not.toContain("Das ändert sich");
    expect(problemScopeSource).not.toContain("wl-scope__module");
    expect(problemScopeSource).toContain("prefers-reduced-motion");
  });

  it("implements accessible tabbed process navigation with auto-advance safeguards", () => {
    expect(processSource).toContain('role="tablist"');
    expect(processSource).toContain('role="tab"');
    expect(processSource).toContain(":aria-selected=");
    expect(processSource).toContain(":aria-controls=");
    expect(processSource).toContain('role="tabpanel"');
    expect(processSource).toContain("prefers-reduced-motion");
    expect(processSource).toContain("visibilitychange");
    expect(processSource).toContain("websiteLandingProcessSteps");
    expect(processSource).not.toContain("4 klare Schritte · direkte Zusammenarbeit");
    expect(websiteLandingProcessSteps[3]?.title).toBe(
      "Design, Umsetzung und Livegang",
    );
  });

  it("does not alter the homepage composition for this step", () => {
    expect(homeSource).not.toContain("WebsiteFaqSection");
    expect(homeSource).not.toContain("WebsiteFinalCta");
    expect(homeSource).not.toContain("WebsiteProblemScopeSection");
    expect(homeSource).toContain("HeroSection");
    expect(homeSource).toContain("ServicesSection");
  });
});
