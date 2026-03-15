import type { AppTranslations } from "~/types/i18n";

export const de: AppTranslations = {
  nav: {
    home: "Start",
    about: "Über mich",
    experience: "Erfahrung",
    projects: "Projekte",
    contact: "Kontakt",
    ariaLabel: "Hauptnavigation",
    menuToggle: "Navigation ein- oder ausblenden",
    langSwitchDe: "Sprache auf Deutsch umstellen",
    langSwitchEn: "Sprache auf Englisch umstellen",
  },
  hero: {
    greeting: "Hey, ich bin",
    nameIntro: "Chris Leon Noltemeier",
    roleHeadline: "Full-Stack Developer",
    positioningLine:
      "Full-Stack Developer | Automatisierung & API-Integrationen | AI-Workflows",
    openToWorkBadge: "Offen für neue Herausforderungen",
    locationLabel: "Sitz in Bad Essen · Remote möglich",
    downloadCv: "CV herunterladen (PDF)",
    contactCta: "Kontakt / Call buchen",
    contactCtaSecondary: "Lass uns sprechen",
  },
  about: {
    title: "Über mich",
    paragraphs: [
      "Ich bin Chris Leon Noltemeier, ein Full-Stack Developer mit Fokus auf Anwendungen, die echte Probleme lösen und sich im Alltag bewähren. Ich begleite Ideen gerne vom ersten Prototypen bis zum Produktivbetrieb.",
      "Meine Erfahrung umfasst moderne Frontend-Frameworks, skalierbare Backends und Cloud-Infrastruktur. Mir sind saubere, wartbare Codebasen und pragmatische Architektur wichtig, die trotzdem Raum für Wachstum lässt.",
      "Besonders Spaß macht mir, Workflows durch Automatisierung und gut gestaltete interne Tools zu verbessern – von klaren UIs bis hin zu robusten APIs und Infrastruktur, auf die Teams sich verlassen können.",
    ],
  },
  impact: {
    title: "Impact & Highlights",
    items: [
      {
        title: "Automatisierung & interne Tools",
        description:
          "Konzeption und Umsetzung interner Tools und Workflows, um manuelle Arbeit im Tagesgeschäft zu reduzieren. // TODO: Konkrete % oder Stunden nachtragen, sobald verfügbar.",
      },
      {
        title: "API-Integrationen",
        description:
          "Aufbau und Pflege von API-Schnittstellen rund um bestehende Systeme, um Datenflüsse zu automatisieren und Doppelarbeit zu vermeiden.",
      },
      {
        title: "Developer Experience",
        description:
          "Einführung moderner Tooling-, Typisierungs- und Architekturansätze, damit Features schneller und stabiler ausgeliefert werden können.",
      },
    ],
  },
  experience: {
    title: "Erfahrung & Ausbildung",
    workHeadline: "Berufserfahrung",
    educationHeadline: "Ausbildung",
    naueGroup: {
      title: "Software Developer · Naue Group",
      employmentType: "Vollzeit",
      dateRange: "Juni 2025 – heute",
      bullets: [
        {
          text: "Entwicklung interner Webtools zur Unterstützung von Logistik-, Produktions- und Qualitätsprozessen in Nähe zu SAP.",
        },
        {
          text: "Implementierung von REST-APIs und Integrationen zwischen bestehenden Systemen, um manuelle Dateneingaben und Excel-Prozesse zu reduzieren.",
        },
        {
          text: "Full-Stack-Arbeit mit TypeScript, Vue/Nuxt, Node.js, PostgreSQL und Cloud-Infrastruktur.",
        },
        {
          text: "Enge Zusammenarbeit mit Fachexpert:innen, Anforderungsaufnahme und schnelle Iteration an Prototypen.",
        },
        {
          text: "Mitarbeit in agilen Prozessen, z.B. Refinements, Plannings und Deployment-Abstimmung mit Stakeholdern.",
        },
      ],
    },
    apprenticeship: {
      title: "Fachinformatiker Anwendungsentwicklung",
      description: "Ausbildung · Berufskolleg Lübbecke",
      dateRange: "Aug. 2022 – Juni 2025",
    },
    school: {
      title: "Fachhochschulreife Informatik",
      description: "Berufskolleg Lübbecke · Abschluss Fachabitur",
      dateRange: "Aug. 2020 – Juli 2022",
    },
  },
  projects: {
    title: "Meine Projekte",
    caseStudyModalClose: "Case Study schließen",
    galleryLabel: "Projektbilder",
    prevImage: "Vorheriges Bild",
    nextImage: "Nächstes Bild",
  },
  automationAi: {
    title: "Automatisierung & AI",
    subtitle:
      "Ich helfe Teams dabei, Workflows zu automatisieren, Tools zu verbinden und AI sinnvoll in bestehende Prozesse zu integrieren.",
    useCases: [
      {
        title: "n8n Workflows",
        description:
          "Konzeption und Implementierung von Automatisierungen, die CRM, Support- und interne Systeme verbinden – inklusive Webhooks, Retry-Logik und Monitoring.",
      },
      {
        title: "API-getriebene Integrationen",
        description:
          "Planung und Aufbau robuster REST-APIs, damit Automatisierungen und AI-Agents zuverlässig auf Geschäftsdaten zugreifen können.",
      },
      {
        title: "LLM-gestützte interne Tools",
        description:
          "Erweiterung bestehender Anwendungen um LLM-basierte Assistenten (Zusammenfassungen, Textvorschläge, Klassifikation) mit klarer menschlicher Kontrolle.",
      },
    ],
  },
  contact: {
    title: "Lass uns sprechen",
    intro:
      "Ich bin offen für Festanstellungen, Freelancing und Projekte rund um Automatisierung, Integrationen und Developer-Tooling.",
    nameLabel: "Name",
    emailLabel: "E-Mail",
    topicLabel: "Thema (optional)",
    messageLabel: "Nachricht",
    submitLabel: "Nachricht senden",
    submittingLabel: "Wird gesendet …",
    successMessage:
      "Danke für deine Nachricht! Ich melde mich so schnell wie möglich.",
    errorMessage:
      "Beim Senden ist etwas schiefgelaufen. Bitte versuche es erneut oder nutze LinkedIn oder E-Mail.",
    validationNameRequired: "Bitte gib deinen Namen ein.",
    validationEmailRequired: "Bitte gib deine E-Mail-Adresse ein.",
    validationEmailInvalid: "Bitte gib eine gültige E-Mail-Adresse ein.",
    validationMessageRequired: "Bitte schreibe kurz, worum es geht.",
    spamProtectionLabel: "Dieses Feld leer lassen (Spam-Schutz).",
  },
  seo: {
    title:
      "Chris Leon Noltemeier – Full-Stack Developer (Automatisierung, APIs & AI-Workflows)",
    description:
      "Portfolio von Chris Leon Noltemeier, Full-Stack Developer aus Bad Essen mit Fokus auf Automatisierung, API-Integrationen und AI-gestützte interne Tools.",
    ogTitle:
      "Chris Leon Noltemeier – Full-Stack Developer für Automatisierung & Integrationen",
    ogDescription:
      "Ich helfe Teams, zuverlässige interne Tools, APIs und AI-Workflows über den gesamten Stack hinweg zu bauen.",
  },
  social: {
    githubLabel: "GitHub-Profil öffnen",
    linkedinLabel: "LinkedIn-Profil öffnen",
    emailLabel: "E-Mail senden",
  },
  footer: {
    datenschutz: "Datenschutz",
    privacy: "Privacy Policy",
  },
};

