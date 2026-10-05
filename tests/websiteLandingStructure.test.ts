import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  websiteLandingConsultationPoints,
  websiteLandingFaqItems,
  websiteLandingProblemTransforms,
  websiteLandingProcessSteps,
  websiteLandingProjects,
  websiteLandingScopeItems,
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

    for (const source of [hero, consult, finalCtaSource, problemScopeSource]) {
      expect(source).toContain('projekt: "website"');
      expect(source).toMatch(/contactPath|path:\s*contactPath/);
    }

    expect(landingPageSource).toContain("MainHeader");
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

  it("keeps unrelated pink production placeholders on the landing page", () => {
    const consult = readFileSync(
      resolve("components/landing/FirstConsultationSection.vue"),
      "utf8",
    );
    const hero = readFileSync(
      resolve("components/landing/WebsiteLandingHero.vue"),
      "utf8",
    );

    expect(consult).toContain("TEMPORÄRER MEDIEN-PLATZHALTER");
    expect(hero).toContain("TEMPORÄRER HERO-ASSET-PLATZHALTER");
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
      "Erstellst du auch Onlineshops?",
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

  it("renders four problem transforms and six scope deliverables", () => {
    expect(websiteLandingProblemTransforms).toHaveLength(4);
    expect(websiteLandingProblemTransforms.map((item) => item.problem)).toEqual([
      "Der Auftritt wirkt veraltet oder fehlt ganz.",
      "Besucher verstehen das Angebot nicht sofort.",
      "Die mobile Nutzung ist umständlich oder technisch schwach.",
      "Der Weg zur Anfrage ist unnötig kompliziert.",
    ]);
    expect(websiteLandingProblemTransforms.map((item) => item.result)).toEqual([
      "Ein moderner und glaubwürdiger erster Eindruck, der zu Ihrem Unternehmen passt.",
      "Eine klare Seitenstruktur mit verständlichen Inhalten und eindeutiger Nutzerführung.",
      "Eine responsive und technisch saubere Umsetzung für Smartphone, Tablet und Desktop.",
      "Sichtbare Handlungswege und ein einfacher, nachvollziehbarer Kontaktprozess.",
    ]);

    expect(websiteLandingScopeItems).toHaveLength(6);
    expect(websiteLandingScopeItems.map((item) => item.title)).toEqual([
      "Beratung & Zielklärung",
      "Seitenkonzept & Struktur",
      "Design & Nutzerführung",
      "Responsive Umsetzung",
      "Funktionen & technische Grundlagen",
      "Qualitätssicherung & Livegang",
    ]);

    expect(problemScopeSource).toContain("Ausgangslage");
    expect(problemScopeSource).toContain("Das ändert sich");
    expect(problemScopeSource).toContain("Projekt unverbindlich einordnen lassen");
    expect(problemScopeSource).toContain('projekt: "website"');
    expect(problemScopeSource).toContain("prefers-reduced-motion");
  });

  it("highlights process step four as the final outcome state", () => {
    expect(processSource).toContain("wl-process__step--final");
    expect(processSource).toContain("4 klare Schritte · direkte Zusammenarbeit");
    expect(processSource).toContain("prefers-reduced-motion");
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
