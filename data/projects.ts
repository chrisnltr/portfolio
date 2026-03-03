import type { ProjectCaseStudy } from "~/types/content";

// TODO: Adjust live and GitHub URLs if they differ from your actual deployments.
export const projects: ProjectCaseStudy[] = [
  {
    slug: "accident-report-app",
    images: ["/images/UnfallApp1.png", "/images/UnfallApp2.png", "/images/UnfallApp3.png"],
    techStack: [
      "Flutter",
      "Dart",
      "Google Maps API",
      "SQLite",
      "flutter_localizations",
      "flutter_gen",
    ],
    links: {
      liveUrl: "", // TODO: Add public link if available.
      githubUrl: "", // TODO: Add GitHub repo or keep empty if private.
      codeIsPrivate: true,
    },
    translations: {
      en: {
        title: "Accident Report App",
        subtitle: "Digital accident documentation for insurance-ready reports",
        shortDescription:
          "A mobile app that guides drivers through capturing all accident details, photos and sketches, and exports a ready-to-send PDF.",
        problem:
          "Many drivers forget critical details after an accident, and insurance companies receive incomplete, inconsistent reports.",
        solution:
          "A guided, step-by-step reporting flow with structured forms, map-based sketches and photo capture, bundled into a standardized PDF.",
        outcome:
          "Creates consistent, complete accident reports that can be sent directly to insurers. // TODO: Add concrete numbers once available (e.g. reduced processing time).",
        featuresTitle: "Key features",
        techStackTitle: "Tech stack",
        myContributionTitle: "My contribution",
        myContribution:
          "I implemented the full app in Flutter: data modelling, form flows, Google Maps integration, PDF export and multi-language support.",
        biggestChallengeTitle: "Biggest challenge",
        biggestChallenge:
          "Designing a UX that stays calm and clear in a stressful situation while still collecting all legally relevant data.",
        linksTitle: "Links",
        liveDemoLabel: "Live demo",
        githubLabel: "GitHub",
        codeOnRequestLabel: "Code available on request",
        caseStudyCta: "View case study",
        features: [
          "Structured accident data capture with validation and hints.",
          "Interactive accident sketch on top of a Google Maps background.",
          "Photo capture and attachment directly in the report.",
          "PDF export in a standardized format, ready to send to insurers.",
          "Multi-language support for international use.",
        ],
      },
      de: {
        title: "Accident Report App",
        subtitle: "Digitale Unfallaufnahme für versandfertige Berichte",
        shortDescription:
          "Eine mobile App, die Fahrer Schritt für Schritt durch alle relevanten Unfalldaten führt und daraus einen versandfertigen PDF-Bericht erstellt.",
        problem:
          "Nach einem Unfall werden wichtige Details häufig vergessen, und Versicherungen erhalten unvollständige oder uneinheitliche Berichte.",
        solution:
          "Geführter Schritt-für-Schritt-Prozess mit strukturierten Formularen, kartenbasierter Skizze und Fotodokumentation in einem standardisierten PDF.",
        outcome:
          "Sorgt für konsistente, vollständige Unfallberichte, die direkt an Versicherer versendet werden können. // TODO: Konkrete Kennzahlen ergänzen (z.B. Bearbeitungszeit).",
        featuresTitle: "Wichtige Features",
        techStackTitle: "Tech-Stack",
        myContributionTitle: "Mein Beitrag",
        myContribution:
          "Ich habe die komplette App in Flutter umgesetzt: Datenmodell, Formular-Flows, Google-Maps-Integration, PDF-Export und Mehrsprachigkeit.",
        biggestChallengeTitle: "Größte Herausforderung",
        biggestChallenge:
          "Eine UX zu gestalten, die in einer Stresssituation ruhig und klar bleibt und trotzdem alle rechtlich relevanten Daten einsammelt.",
        linksTitle: "Links",
        liveDemoLabel: "Live-Demo",
        githubLabel: "GitHub",
        codeOnRequestLabel: "Code auf Anfrage",
        caseStudyCta: "Case Study ansehen",
        features: [
          "Geführte Erfassung aller relevanten Unfalldaten mit Validierung und Hinweisen.",
          "Interaktive Unfallskizze auf einer Google-Maps-Karte.",
          "Fotodokumentation direkt im Bericht.",
          "PDF-Export in einem standardisierten, versandfertigen Format.",
          "Mehrsprachige Oberfläche für internationale Nutzung.",
        ],
      },
    },
  },
  {
    slug: "billiard-battle-3d",
    images: [
      "/images/BilliardGame1.png",
      "/images/BilliardGame2.png",
      "/images/BilliardGame3.png",
      "/images/BilliardGame4.png",
      "/images/BilliardGame5.png",
    ],
    techStack: ["Unity", "C#", "Unity Input System", "Mirror Networking", "Steamworks"],
    links: {
      liveUrl: "", // TODO: Add Steam or demo link if public.
      githubUrl: "", // TODO: Add GitHub repo or keep empty if private.
      codeIsPrivate: true,
    },
    translations: {
      en: {
        title: "Billiard Battle 3D",
        subtitle: "Online 3D billiards with real-time 1v1 matches",
        shortDescription:
          "A multiplayer 3D billiards game with realistic physics, smooth cue controls and private rooms to challenge friends.",
        problem:
          "Most casual online billiard games feel clunky, with poor physics and friction in inviting friends to play together.",
        solution:
          "A focused 1v1 experience with polished controls, realistic physics and a simple room-code system for quick friend matches.",
        outcome:
          "Delivers a smooth multiplayer experience that feels close to playing at a real table. // TODO: Add player/session numbers once available.",
        featuresTitle: "Key features",
        techStackTitle: "Tech stack",
        myContributionTitle: "My contribution",
        myContribution:
          "I built the core gameplay loop, physics tuning, room system and networking layer, plus the in-game UI and menus.",
        biggestChallengeTitle: "Biggest challenge",
        biggestChallenge:
          "Balancing realistic physics with a forgiving, responsive UX for players using different devices and input methods.",
        linksTitle: "Links",
        liveDemoLabel: "Download / Play",
        githubLabel: "GitHub",
        codeOnRequestLabel: "Code available on request",
        caseStudyCta: "View case study",
        features: [
          "Online 1v1 matches with invite codes and quick join.",
          "Realistic ball physics, cushions and spin control.",
          "Intuitive cue controls with aim line and power indicator.",
          "Private rooms for frictionless matches with friends.",
          "Configurable rules (e.g. 8-ball/9-ball) and timers.",
        ],
      },
      de: {
        title: "Billiard Battle 3D",
        subtitle: "Online-3D-Billard mit Echtzeit-1v1-Matches",
        shortDescription:
          "Ein Multiplayer-3D-Billardspiel mit realistischer Physik, flüssigen Queue-Steuerungen und privaten Räumen zum Spielen mit Freunden.",
        problem:
          "Viele Casual-Billardspiele online fühlen sich unpräzise an – schwache Physik und umständliche Wege, Freunde ins Spiel zu holen.",
        solution:
          "Ein fokussiertes 1v1-Erlebnis mit sauber abgestimmter Physik, durchdachten Controls und einfachem Raumcode-System für schnelle Friend-Matches.",
        outcome:
          "Erzeugt ein geschmeidiges Multiplayer-Erlebnis, das sich nah an echter Tischbillard-Erfahrung anfühlt. // TODO: Spieler- oder Sessionzahlen ergänzen, falls sinnvoll.",
        featuresTitle: "Wichtige Features",
        techStackTitle: "Tech-Stack",
        myContributionTitle: "Mein Beitrag",
        myContribution:
          "Ich habe den Kern des Gameplays, die Physik-Feinabstimmung, das Raumsystem und den Networking-Layer sowie UI und Menüs umgesetzt.",
        biggestChallengeTitle: "Größte Herausforderung",
        biggestChallenge:
          "Realistische Physik mit einer verzeihenden, responsiven UX für unterschiedliche Geräte und Eingabemethoden in Einklang zu bringen.",
        linksTitle: "Links",
        liveDemoLabel: "Download / Spielen",
        githubLabel: "GitHub",
        codeOnRequestLabel: "Code auf Anfrage",
        caseStudyCta: "Case Study ansehen",
        features: [
          "Online-1v1-Matches mit Einladungs-Codes und Quick-Join.",
          "Realistische Ballphysik, Bandenverhalten und Effet.",
          "Intuitive Queue-Steuerung mit Ziellinie und Kraftanzeige.",
          "Private Räume für unkomplizierte Spiele mit Freunden.",
          "Konfigurierbare Regeln (z.B. 8-Ball/9-Ball) und Timer.",
        ],
      },
    },
  },
  {
    slug: "hardware-management",
    images: [
      "/images/HardwareManager1.png",
      "/images/HardwareManager2.png",
      "/images/HardwareManager3.png",
    ],
    techStack: [
      "Nuxt 3",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Drizzle ORM",
      "PostgreSQL",
      "Docker",
    ],
    links: {
      liveUrl: "", // TODO: Add internal or demo URL if shareable.
      githubUrl: "", // TODO: Add GitHub repo or keep empty if private.
      codeIsPrivate: true,
    },
    translations: {
      en: {
        title: "Hardware Management System",
        subtitle: "Central inventory & lifecycle for company hardware",
        shortDescription:
          "A web app for managing hardware data sheets, history and exports, built with Nuxt 3 and a typed Node.js backend.",
        problem:
          "Hardware inventories were spread across spreadsheets and outdated documents, making it hard to track responsibility and changes.",
        solution:
          "A central, searchable web application with authentication, change history and CSV exports for reporting and audits.",
        outcome:
          "Improves transparency and reduces friction when onboarding, offboarding or replacing hardware. // TODO: Add concrete impact metrics when available.",
        featuresTitle: "Key features",
        techStackTitle: "Tech stack",
        myContributionTitle: "My contribution",
        myContribution:
          "I designed and implemented the full stack: Nuxt 3 frontend, typed Node.js API with Drizzle ORM, PostgreSQL schema and infrastructure with Docker.",
        biggestChallengeTitle: "Biggest challenge",
        biggestChallenge:
          "Designing a data model and history tracking that stays simple for users but still captures all relevant changes over time.",
        linksTitle: "Links",
        liveDemoLabel: "Live demo",
        githubLabel: "GitHub",
        codeOnRequestLabel: "Code available on request",
        caseStudyCta: "View case study",
        features: [
          "Create, edit and archive hardware data sheets with validation.",
          "Advanced search and filtering across multiple properties.",
          "Authentication and role-based access (e.g. admins vs. viewers).",
          "CSV export of the full inventory for reporting.",
          "Change history per hardware item for audits.",
        ],
      },
      de: {
        title: "Hardware Management System",
        subtitle: "Zentrales Inventar & Lifecycle für Firmen-Hardware",
        shortDescription:
          "Eine Webanwendung für die Verwaltung von Hardware-Datenblättern, Historie und Exporten – umgesetzt mit Nuxt 3 und einem typisierten Node.js-Backend.",
        problem:
          "Hardware-Bestände waren über Excel-Listen und veraltete Dokumente verteilt, Verantwortlichkeiten und Änderungen waren schwer nachzuvollziehen.",
        solution:
          "Eine zentrale, durchsuchbare Web-App mit Login, Änderungshistorie und CSV-Export für Reporting und Audits.",
        outcome:
          "Erhöht Transparenz und reduziert Reibung bei Onboarding, Offboarding und Hardware-Tausch. // TODO: Konkrete Effekte ergänzen (z.B. weniger Rückfragen).",
        featuresTitle: "Wichtige Features",
        techStackTitle: "Tech-Stack",
        myContributionTitle: "Mein Beitrag",
        myContribution:
          "Ich habe den kompletten Stack entworfen und umgesetzt: Nuxt-3-Frontend, typisierte Node.js-API mit Drizzle ORM, PostgreSQL-Schema und Infrastruktur mit Docker.",
        biggestChallengeTitle: "Größte Herausforderung",
        biggestChallenge:
          "Ein Datenmodell und eine Historisierung zu bauen, die für Nutzer:innen einfach bleibt, aber alle relevanten Änderungen sauber abbildet.",
        linksTitle: "Links",
        liveDemoLabel: "Live-Demo",
        githubLabel: "GitHub",
        codeOnRequestLabel: "Code auf Anfrage",
        caseStudyCta: "Case Study ansehen",
        features: [
          "Anlegen, Bearbeiten und Archivieren von Hardware-Datenblättern mit Validierung.",
          "Erweiterte Suche und Filterung über mehrere Eigenschaften.",
          "Authentifizierung und rollenbasierter Zugriff (z.B. Admins vs. Viewer).",
          "CSV-Export des gesamten Bestands für Reporting.",
          "Änderungshistorie pro Hardware für Audits.",
        ],
      },
    },
  },
];

