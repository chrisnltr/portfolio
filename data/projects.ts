import type { ProjectCaseStudy } from "~/types/content";

/**
 * Asset checklist (missing files → ProjectVisual / card placeholder):
 *
 * Homepage full-page previews (recommended for hover-scroll):
 * - /public/images/previews/cantus-halle-full.webp   (~1440px wide, natural full height)
 * - /public/images/previews/ls-aktivstall-homepage-desktop.png
 * - /public/images/previews/portfolio-fullpage-stallzentrale.png
 * - /public/images/previews/crashreport-full.webp
 * - /public/images/previews/hardware-management-full.webp
 * - /public/images/Crispy-Billiards-*.png, LoadingScreen.png (desktop game frames)
 *
 * Cantus-Halle / Stallzentrale: no approved screenshots yet
 * CrashReport: /public/images/UnfallApp*.png (composites, not full-page)
 * Hardware: /public/images/HardwareManager*.png (UI crops, not full-page)
 * Crispy Billiards: MainMenu, Shop, LoadingScreen (desktop, hover-cycle)
 */
export const projects: ProjectCaseStudy[] = [
  {
    slug: "cantus-halle",
    routeSlug: "cantus-halle",
    visibility: "secondary",
    homepageOrder: 1,
    status: "in-progress",
    industry: "equestrian",
    visualKind: "browser-phone",
    layout: "default",
    accent: "#6892ec",
    showContactCta: true,
    technologies: ["Shopify", "Liquid", "JavaScript", "CSS", "Responsive Design"],
    cardTags: ["Shopify", "Website", "Shop"],
    images: [],
    content: {
        title: "Cantus-Halle",
        subtitle: "Website und Shopify-Shop für Aktivlaufstall und Produktmarke",
        shortDescription:
          "Gemeinsame digitale Präsenz für die Cantus-Halle und die Produktmarke Filzharmonie: Website, Shop und Inhalte in einem System.",
        statusLabel: "In Umsetzung",
        industryLabel: "Pferdebetrieb / Produktmarke",
        roleLabel: "Konzeption und Shopify-Umsetzung",
        platformLabel: "Website und Shop",
        situation:
          "Der bestehende Shopify-Auftritt sollte zu einer gemeinsamen digitalen Präsenz für die Cantus-Halle und die Produktmarke Filzharmonie weiterentwickelt werden.",
        goal:
          "Ein hochwertiger, mobiler Auftritt, der den Aktivlaufstall, Kurse und Produkte übersichtlich in einem System verbindet.",
        solution:
          "Ein einheitliches Shopify-Theme mit klarer Informationsarchitektur: Stall und Marke teilen sich eine Präsenz, ohne dass Shop und Inhaltsseiten konkurrieren.",
        implementation:
          "Auf Basis von Shopify entsteht ein einheitliches Theme mit klarer Informationsarchitektur. Die Umsetzung umfasst Layout, Komponenten, Produktdarstellung und die technische Einrichtung.",
        highlights: [
          {
            title: "Gemeinsame Präsenz",
            description:
              "Aktivlaufstall und Produktmarke teilen sich eine verständliche digitale Struktur.",
          },
          {
            title: "Shopify-Theme",
            description:
              "Layout und Komponenten für Website, Shop und Inhaltsseiten in einem System.",
          },
          {
            title: "Produktdarstellung",
            description:
              "Produktseiten mit Varianten im Warenkorb und klaren Kaufwegen.",
          },
          {
            title: "Technische Einrichtung",
            description:
              "Zuverlässige Einrichtung von Kontakt, Anfahrt und mobil priorisierter Bedienung.",
          },
        ],
        services: [
          "Struktur und visuelles Konzept",
          "Shopify-Theme-Entwicklung",
          "Responsive Website",
          "Shop- und Produktdarstellung",
          "Produktvarianten im Warenkorb",
          "Kurs- und Inhaltsseiten",
          "Kontakt und Anfahrt",
          "Technische Einrichtung",
        ],
        features: [
          "Gemeinsame Präsenz für Aktivlaufstall und Produktmarke",
          "Übersichtliche Kurs- und Inhaltsseiten",
          "Produktseiten mit Varianten im Warenkorb",
          "Kontakt und Anfahrt als klare Einstiege",
          "Mobil priorisierte Bedienung",
        ],
        ctaLabel: "Projekt ansehen",
        seoTitle: "Cantus-Halle Case Study | Chris Leon Noltemeier",
        seoDescription:
          "Case Study: Website und Shopify-Shop für die Cantus-Halle und Filzharmonie. Struktur, Theme-Entwicklung und technische Einrichtung.",
      },
  },
  {
    slug: "ls-aktivstall",
    routeSlug: "ls-aktivstall",
    visibility: "secondary",
    homepageOrder: 2,
    status: "live",
    industry: "equestrian",
    visualKind: "browser",
    layout: "default",
    accent: "#2bac70",
    showContactCta: true,
    technologies: ["Nuxt", "TypeScript", "Responsive Design"],
    cardTags: ["Website", "Responsive", "Pferdebetrieb"],
    externalUrl: "https://www.ls-aktivstall.de/",
    homepageExternalUrl: "https://www.ls-aktivstall.de/",
    previewImage: {
      src: "/images/previews/ls-aktivstall-homepage-desktop.png",
      width: 1870,
      height: 9905,
      kind: "desktop",
      alt: "LS Aktivstall: vollständige Startseite von Hero bis Footer",
    },
    images: [
      {
        src: "/images/previews/ls-aktivstall-hero.webp",
        width: 1440,
        height: 900,
        kind: "desktop",
        priority: true,
        fit: "cover",
        objectPosition: "center top",
        alt: "LS Aktivstall: Startseite mit Luftaufnahme, Navigation und Hero-Bereich",
      },
    ],
    content: {
        title: "LS Aktivstall",
        subtitle: "Website für einen Aktivstall in Stemwede",
        shortDescription:
          "Für LS Aktivstall entwickelte ich einen modernen, responsiven Webauftritt, der Haltungskonzept, Anlage, Landwirtschaft und Leistungen verständlich präsentiert und Interessenten gezielt zur Kontakt- oder Platzanfrage führt.",
        statusLabel: "Live",
        industryLabel: "Kundenprojekt / Pferdebetrieb",
        roleLabel: "Konzeption, Design und Webentwicklung",
        platformLabel: "Unternehmenswebsite",
        situation:
          "Der Betrieb benötigte einen zentralen digitalen Auftritt, über den Interessenten das Haltungskonzept, die Anlage und die angebotenen Leistungen ohne verstreute Informationen kennenlernen können.",
        goal:
          "Ein klar strukturierter Webauftritt, der den Aktivstall authentisch präsentiert und Interessenten gezielt zur Platzanfrage führt.",
        solution:
          "Ich entwickelte eine klar strukturierte Website mit großflächiger Bildsprache, verständlichen Inhalten und gezielten Kontaktwegen. Der Betrieb wird authentisch präsentiert, während Interessenten schnell zu den für sie relevanten Informationen und zur Platzanfrage gelangen.",
        implementation:
          "Für LS Aktivstall entstand eine responsive Unternehmenswebsite mit Nuxt und TypeScript. Eine klare Navigation, großflächige Bilder und verständlich gegliederte Inhalte präsentieren den Betrieb authentisch auf Desktop und Mobilgeräten. Gleichzeitig bildet die Website den öffentlichen Einstieg, während die digitale Stallverwaltung als separates Softwareprodukt umgesetzt ist.",
        highlights: [
          {
            title: "Haltungskonzept verständlich erklärt",
            description:
              "Besucher erhalten einen klaren Einblick in den Aktivstall, die Pferdehaltung, die Leistungen und den Alltag auf dem Hof.",
          },
          {
            title: "Anlage und Landwirtschaft",
            description:
              "Großflächige Bilder und strukturierte Inhalte machen den Betrieb, seine Anlage und den landwirtschaftlichen Hintergrund greifbar.",
          },
          {
            title: "Leistungen und Orientierung",
            description:
              "Eine übersichtliche Navigation führt Interessenten gezielt durch Haltungskonzept, Anlage, Leistungen und weitere Informationen.",
          },
          {
            title: "Kontakt und digitaler Zugang",
            description:
              "Klare Kontaktwege unterstützen unverbindliche Platzanfragen; der Zugang zur separaten Stallverwaltung bleibt eindeutig vom öffentlichen Webauftritt getrennt.",
          },
        ],
        services: [
          "Struktur und Informationsarchitektur",
          "Responsive Website",
          "Inhalte zu Haltung, Anlage und Leistungen",
          "Kontakt und Platzanfrage",
          "Technische Einrichtung und Livegang",
        ],
        features: [
          "Präsentation von Haltungskonzept und Anlage",
          "Inhalte zu Landwirtschaft und Leistungen",
          "Klare Navigation und Bildsprache",
          "Kontakt- und Platzanfrage",
          "Mobil optimierte Bedienung",
        ],
        ctaLabel: "Projekt ansehen",
        externalLinkLabel: "Zur Webseite",
        seoTitle: "LS Aktivstall Case Study | Chris Leon Noltemeier",
        seoDescription:
          "Live eingesetzte Kundenwebsite für einen Aktivstall in Stemwede: Haltungskonzept, Anlage, Leistungen und gezielte Platzanfragen.",
      },
  },
  {
    slug: "stallzentrale",
    routeSlug: "stallzentrale",
    visibility: "secondary",
    homepageOrder: 3,
    status: "pilot",
    industry: "equestrian",
    visualKind: "browser-phone",
    layout: "default",
    accent: "#2bac70",
    showContactCta: true,
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL"],
    cardTags: ["Next.js", "SaaS", "Pferdebetriebe"],
    previewImage: {
      src: "/images/previews/portfolio-fullpage-stallzentrale.png",
      width: 1440,
      height: 12006,
      kind: "desktop",
      alt: "Stallzentrale: vollständige Produktseite von Hero bis Footer",
    },
    images: [
      {
        src: "/images/previews/portfolio-fullpage-stallzentrale.png",
        width: 1440,
        height: 12006,
        kind: "desktop",
        priority: true,
        fit: "cover",
        objectPosition: "center top",
        alt: "Stallzentrale: Produktseite mit Hero und App-Mockups",
      },
    ],
    content: {
        title: "Stallzentrale",
        subtitle: "Digitale Stallverwaltung für Aktiv-, Offen- und Pensionsställe",
        shortDescription:
          "Aus einer individuellen Lösung für einen Aktivstall entwickelte ich ein eigenständiges, mandantenfähiges SaaS-Produkt. Stallzentrale bündelt tägliche Abläufe für Betreiber, Einsteller und weitere Rollen in einer browserbasierten Anwendung.",
        statusLabel: "Pilotbetrieb",
        industryLabel: "SaaS-Produkt",
        roleLabel: "Produktkonzeption und Full-Stack-Entwicklung",
        platformLabel: "SaaS-Webanwendung",
        situation:
          "Viele wiederkehrende Abläufe in Pferdebetrieben werden über WhatsApp, Zettel, Tabellen und einzelne Absprachen organisiert. Dadurch gehen Informationen verloren, Leistungen werden vergessen und Betreiber müssen Daten aus mehreren Quellen zusammenführen.",
        goal:
          "Wiederkehrende Stallabläufe für Betreiber und Einsteller in einer gemeinsamen, mandantenfähigen Anwendung bündeln.",
        solution:
          "Stallzentrale bündelt Pferde- und Nutzerverwaltung, Zusatzleistungen, Freigaben, Tagesübersichten, Hofdienste, Hallenbelegung, Gesundheitsstatus und Abrechnung in einer gemeinsamen Anwendung. Aus der ersten individuellen Lösung entstand eine mandantenfähige Plattform für weitere Stallbetriebe.",
        implementation:
          "Stallzentrale entwickle ich als mandantenfähige SaaS-Anwendung mit Next.js, React, TypeScript und Supabase. Authentifizierung, rollenbasierte Zugriffe, getrennte Stalldaten und stallbezogenes Branding ermöglichen es, mehrere Betriebe innerhalb einer gemeinsamen Plattform sauber voneinander zu trennen. Der aktuelle Stand ist ein funktionsfähiger Pilot, der anhand realer Stallabläufe weiterentwickelt wird.",
        highlights: [
          {
            title: "Rollen, Einsteller und Pferde",
            description:
              "Getrennte Zugänge für Administration, Einsteller und Reitbeteiligungen verbinden Nutzer, Pferde und Berechtigungen in einer gemeinsamen Anwendung.",
          },
          {
            title: "Buchungen und Tagesabläufe",
            description:
              "Zusatzleistungen werden gebucht, bestätigt, im Tagesplan angezeigt, erledigt und anschließend nachvollziehbar abgerechnet.",
          },
          {
            title: "Hofdienste, Halle und Gesundheit",
            description:
              "Wiederkehrende Hofdienste, Hallenbelegung und Gesundheitsinformationen werden zentral organisiert und für die jeweiligen Rollen sichtbar gemacht.",
          },
          {
            title: "Abrechnung und Pilotbetrieb",
            description:
              "Erbrachte Leistungen lassen sich nachvollziehen und als Abrechnung beziehungsweise PDF ausgeben. Reale Abläufe aus dem Pilotbetrieb fließen direkt in die Weiterentwicklung ein.",
          },
        ],
        services: [
          "Produktkonzeption für Pferdebetriebe",
          "Full-Stack-Entwicklung",
          "Rollen- und Rechtekonzept",
          "Dashboards für Admin und Einsteller",
          "Abrechnung und PDF-Ausgabe",
          "Iterative Weiterentwicklung im Pilot",
        ],
        features: [
          "Rollen- und Benutzerverwaltung",
          "Pferdeverwaltung",
          "Zusatzleistungen und Buchungen",
          "Hofdienste",
          "Hallenbelegung",
          "Gesundheitsstatus",
          "Abrechnung und PDF-Rechnungen",
          "Admin- und Einsteller-Dashboards",
          "Kommentare und Bestätigungen",
        ],
        ctaLabel: "Projekt ansehen",
        seoTitle: "Stallzentrale Case Study | Chris Leon Noltemeier",
        seoDescription:
          "Eigenständig entwickeltes SaaS-Produkt für Aktiv-, Offen- und Pensionsställe, vom realen Pilotbetrieb bis zur mandantenfähigen Plattform.",
      },
  },
  {
    slug: "accident-report-app",
    routeSlug: "crashreport",
    visibility: "featured",
    homepageOrder: 1,
    status: "live",
    industry: "mobility",
    visualKind: "phone",
    layout: "app",
    accent: "#5b8def",
    showContactCta: true,
    technologies: ["Flutter", "Dart", "Google Maps API", "SQLite", "PDF"],
    cardTags: ["Flutter", "Mobile", "PDF"],
    externalUrl: "https://crashreport.de/",
    previewImage: {
      src: "/images/UnfallApp1.png",
      width: 1920,
      height: 960,
      kind: "mobile",
      alt: "CrashReport: Website- und App-Vorschau",
    },
    cardCycleImages: [
      {
        src: "/images/UnfallApp1.png",
        width: 1920,
        height: 960,
        kind: "desktop",
        alt: "CrashReport: Website- und App-Vorschau",
      },
      {
        src: "/images/UnfallApp2.png",
        width: 1920,
        height: 960,
        kind: "desktop",
        alt: "CrashReport App: Erfassung von Zeugen-, Versicherungs- und Fahrzeugdaten",
      },
      {
        src: "/images/UnfallApp3.png",
        width: 1920,
        height: 960,
        kind: "desktop",
        alt: "CrashReport App: Dokumentation mit Skizze und Übersicht",
      },
    ],
    images: [
      {
        src: "/images/UnfallApp1.png",
        width: 1920,
        height: 960,
        kind: "mobile",
        priority: true,
        fit: "contain",
        presentation: "phone-showcase",
        objectPosition: "center",
        alt: "CrashReport App: Start der geführten Unfallaufnahme und PDF-Vorschau",
      },
      {
        src: "/images/UnfallApp2.png",
        width: 1920,
        height: 960,
        kind: "mobile",
        fit: "contain",
        presentation: "phone-showcase",
        alt: "CrashReport App: Erfassung von Zeugen-, Versicherungs- und Fahrzeugdaten",
      },
      {
        src: "/images/UnfallApp3.png",
        width: 1920,
        height: 960,
        kind: "mobile",
        fit: "contain",
        presentation: "phone-showcase",
        alt: "CrashReport App: Dokumentation mit Skizze und Übersicht",
      },
    ],
    content: {
        title: "CrashReport",
        subtitle: "Digitale Unfallaufnahme mit strukturiertem PDF-Bericht",
        shortDescription:
          "Die mobile App führt Schritt für Schritt durch die Unfallaufnahme, bündelt Beteiligte, Fahrzeuge, Fotos und eine kartenbasierte Skizze und erzeugt daraus einen übersichtlichen PDF-Bericht.",
        statusLabel: "Abgeschlossenes Eigenprojekt",
        industryLabel: "Mobilität / Dokumentation",
        roleLabel: "Konzeption, UX und App-Entwicklung",
        platformLabel: "Mobile App",
        situation:
          "Nach einem eigenen Verkehrsunfall (zum Glück ohne Personenschaden) während meiner Ausbildung musste ich mich lange mit Formularen und Papierkram beschäftigen. Dabei entstand die Frage, warum sich eine Unfallaufnahme nicht einfacher, geführter und vollständig digital erledigen lässt.",
        goal:
          "Eine geführte digitale Unfallaufnahme, die alle relevanten Angaben bündelt und als übersichtlichen PDF-Bericht ausgibt.",
        solution:
          "Da ich online keine Lösung fand, die diesen Ablauf für mich überzeugend abbildete, entwickelte ich CrashReport selbst. Die App erfasst alle relevanten Angaben strukturiert, ergänzt Fotos und eine kartenbasierte Unfallskizze und erstellt daraus einen einheitlichen PDF-Bericht.",
        implementation:
          "CrashReport habe ich als mobile Flutter-App mit lokaler Datenhaltung, Kartenansicht und PDF-Generierung umgesetzt. Im Mittelpunkt standen ein verständlicher Ablauf, eine zuverlässige Eingabeprüfung und eine Ausgabe, die direkt weitergegeben werden kann.",
        highlights: [
          {
            title: "Geführte Unfallaufnahme",
            description:
              "Ein klarer Schritt-für-Schritt-Ablauf erfasst Beteiligte, Fahrzeuge und Unfalldaten auch in einer stressigen Situation vollständig.",
          },
          {
            title: "Fotos und Unfallskizze",
            description:
              "Unfallbilder und eine kartenbasierte Skizze dokumentieren Ort, Fahrtrichtung und Situation anschaulich.",
          },
          {
            title: "Vollständigkeit vor dem Export",
            description:
              "Validierungen weisen auf fehlende Angaben hin, bevor der fertige Bericht erstellt wird.",
          },
          {
            title: "PDF-Export und Mehrsprachigkeit",
            description:
              "Alle Daten, Fotos und Skizzen werden in einem einheitlichen Bericht gebündelt; die Oberfläche ist mehrsprachig ausgelegt.",
          },
        ],
        services: [
          "Konzeption des Aufnahmeprozesses",
          "Flutter-App-Entwicklung",
          "Kartenbasierte Unfallskizze",
          "Fotodokumentation",
          "Validierung der Eingaben",
          "PDF-Export",
          "Mehrsprachige Oberfläche",
        ],
        features: [
          "Geführte Aufnahme der Unfalldaten",
          "Fotodokumentation",
          "Unfallskizze",
          "Validierung",
          "Mehrsprachige Oberfläche",
          "PDF-Erstellung",
        ],
        ctaLabel: "Projekt ansehen",
        externalLinkLabel: "Projekt ansehen",
        seoTitle: "CrashReport Case Study | Chris Leon Noltemeier",
        seoDescription:
          "Mobile App für die geführte Unfallaufnahme mit Fotos, Karten-Skizze und PDF-Export, entstanden aus eigener Erfahrung.",
      },
  },
  {
    slug: "hardware-management",
    routeSlug: "hardware-management",
    visibility: "featured",
    homepageOrder: 3,
    status: "reference",
    industry: "internal-tools",
    visualKind: "browser",
    layout: "internal",
    accent: "#2bac70",
    showContactCta: true,
    technologies: ["Nuxt 3", "Vue.js", "TypeScript", "PostgreSQL", "Docker"],
    cardTags: ["Nuxt", "Abschlussprojekt", "PostgreSQL"],
    previewImage: {
      src: "/images/HardwareManager1.png",
      width: 1903,
      height: 1200,
      kind: "desktop",
      alt: "Hardware Management System: Oberflächenvorschau",
    },
    cardCycleImages: [
      {
        src: "/images/HardwareManager1.png",
        width: 1903,
        height: 1200,
        kind: "desktop",
        alt: "Hardware Management System: Suche und Ergebnisliste",
      },
      {
        src: "/images/HardwareManager3.png",
        width: 1901,
        height: 1200,
        kind: "desktop",
        alt: "Hardware Management System: Detailansicht eines Hardwaredatenblatts",
      },
      {
        src: "/images/HardwareManager2.png",
        width: 1902,
        height: 1200,
        kind: "desktop",
        alt: "Hardware Management System: weitere Geräteansicht",
      },
    ],
    images: [
      {
        src: "/images/HardwareManager1.png",
        width: 1903,
        height: 1200,
        kind: "desktop",
        priority: true,
        fit: "cover",
        objectPosition: "center 28%",
        alt: "Hardware Management System: Suche und Ergebnisliste der Geräteverwaltung",
      },
      {
        src: "/images/HardwareManager3.png",
        width: 1901,
        height: 1200,
        kind: "desktop",
        fit: "cover",
        objectPosition: "center top",
        alt: "Hardware Management System: Detailansicht eines Hardwaredatenblatts",
      },
      {
        src: "/images/HardwareManager2.png",
        width: 1902,
        height: 1200,
        kind: "desktop",
        fit: "cover",
        objectPosition: "center top",
        alt: "Hardware Management System: weitere Geräteansicht",
      },
    ],
    content: {
        title: "Hardware Management System",
        subtitle: "Zentrale Verwaltung von Firmen-Hardware",
        shortDescription:
          "Mein Abschlussprojekt in der Ausbildung zum Fachinformatiker für Anwendungsentwicklung: eine interne Webanwendung, die Hardwaredaten, Zuständigkeiten, Änderungen und Exporte zentral abbildet.",
        statusLabel: "Abschlussprojekt",
        industryLabel: "Ausbildung",
        roleLabel: "Konzeption und Full-Stack-Entwicklung",
        platformLabel: "Interne Webanwendung",
        situation:
          "Im Ausbildungsbetrieb waren Geräteinformationen, Datenblätter und Zuständigkeiten über mehrere Listen und Dokumente verteilt. Dadurch ließen sich Bestände, Verantwortlichkeiten und Änderungen nur mit zusätzlichem Aufwand nachvollziehen.",
        goal:
          "Eine zentrale Anwendung für Hardwaredaten, Zuständigkeiten, Änderungshistorie und Exporte im Betriebsalltag.",
        solution:
          "Für mein Abschlussprojekt konzipierte und entwickelte ich ein zentrales Hardware-Management-System. Geräte können vollständig erfasst, gesucht, gefiltert und verantwortlichen Personen zugewiesen werden. Rollen, Änderungshistorie und Exporte sorgen zusätzlich für nachvollziehbare Abläufe.",
        implementation:
          "Das System entstand als Full-Stack-Webanwendung mit Nuxt 3, Vue.js und TypeScript. PostgreSQL bildet die zentrale Datenbasis, während Docker eine reproduzierbare technische Umgebung ermöglicht. Der Schwerpunkt lag auf einem strukturierten Datenmodell, rollenbasierten Rechten und nachvollziehbaren Änderungen.",
        highlights: [
          {
            title: "Zentrale Hardware-Datenblätter",
            description:
              "Technische, kaufmännische und administrative Geräteinformationen werden strukturiert an einem Ort erfasst.",
          },
          {
            title: "Schnelle Suche und Filter",
            description:
              "Typisierte Such- und Filterkriterien machen Hardwarebestände gezielt und ohne Umwege auffindbar.",
          },
          {
            title: "Rollen und Verantwortlichkeiten",
            description:
              "Rollenbasierte Zugriffe und eindeutige Zuweisungen schaffen klare Zuständigkeiten für Geräte und Daten.",
          },
          {
            title: "Änderungshistorie und Export",
            description:
              "Änderungen bleiben nachvollziehbar und relevante Bestandsdaten können für den betrieblichen Einsatz exportiert werden.",
          },
        ],
        services: [
          "Full-Stack-Entwicklung",
          "Datenmodell und Historisierung",
          "Authentifizierung und Rollen",
          "CSV-Export",
        ],
        features: [
          "Datenblätter mit Validierung",
          "Suche und Filter",
          "Rollenbasierter Zugriff",
          "Änderungshistorie",
          "CSV-Export",
        ],
        ctaLabel: "Projekt ansehen",
        seoTitle: "Hardware Management System | Chris Leon Noltemeier",
        seoDescription:
          "Abschlussprojekt der Ausbildung: interne Webanwendung zur zentralen Verwaltung von Firmen-Hardware, Zuständigkeiten und Änderungen.",
      },
  },
  {
    slug: "crispy-billiards",
    routeSlug: "crispy-billiards",
    visibility: "archive",
    homepageOrder: 2,
    status: "in-progress",
    industry: "entertainment",
    visualKind: "browser",
    layout: "archive",
    accent: "#e0b24a",
    showContactCta: false,
    technologies: ["Unity", "C#", "Mirror Networking", "FizzySteamworks"],
    cardTags: ["Unity", "3D", "Multiplayer"],
    previewImage: {
      src: "/images/Crispy-Billiards-MainMenu.png",
      width: 1920,
      height: 1080,
      kind: "desktop",
      alt: "Crispy Billiards: Hauptmenü mit Billardtisch",
    },
    cardCycleImages: [
      {
        src: "/images/Crispy-Billiards-MainMenu.png",
        width: 1920,
        height: 1080,
        kind: "desktop",
        alt: "Crispy Billiards: Hauptmenü mit Billardtisch",
      },
      {
        src: "/images/LoadingScreen.png",
        width: 1672,
        height: 941,
        kind: "desktop",
        alt: "Crispy Billiards: Loading Screen mit Logo und Tisch",
      },
      {
        src: "/images/Crispy-Billiards-Shop.png",
        width: 1920,
        height: 1080,
        kind: "desktop",
        alt: "Crispy Billiards: Shop mit Tischen und Inventar",
      },
    ],
    images: [
      {
        src: "/images/Crispy-Billiards-MainMenu.png",
        width: 1920,
        height: 1080,
        kind: "desktop",
        priority: true,
        fit: "cover",
        objectPosition: "center",
        alt: "Crispy Billiards: Hauptmenü mit Billardtisch",
      },
      {
        src: "/images/LoadingScreen.png",
        width: 1672,
        height: 941,
        kind: "desktop",
        fit: "cover",
        objectPosition: "center",
        alt: "Crispy Billiards: Loading Screen mit Logo und Tisch",
      },
      {
        src: "/images/Crispy-Billiards-Shop.png",
        width: 1920,
        height: 1080,
        kind: "desktop",
        fit: "cover",
        objectPosition: "center",
        alt: "Crispy Billiards: Shop mit Tischen und Inventar",
      },
    ],
    content: {
        title: "Crispy Billiards",
        subtitle: "Online-3D-Billard mit synchronisierten 1v1-Partien",
        shortDescription:
          "Ein eigenständig entwickeltes 3D-Billardspiel mit physikbasiertem Gameplay, Online-Lobbys, vollständigem Matchablauf und kosmetischer Individualisierung. Der Steam-Launch wird aktuell vorbereitet.",
        statusLabel: "In aktiver Entwicklung",
        industryLabel: "Steam / Multiplayer",
        roleLabel: "Game Design, Entwicklung und Networking",
        platformLabel: "3D-Online-Spiel",
        situation:
          "Bei einem Online-Billardspiel müssen Ballphysik, Steuerung, Regeln, Kamera und Netzwerksynchronisation wie ein zusammenhängendes System funktionieren. Bereits kleine Abweichungen werden in einer direkten 1v1-Partie sofort sichtbar.",
        goal:
          "Ein vollständiges Steam-Spiel mit präziser Stoßsteuerung, synchronisierten Online-Partien und eigenem Matchablauf.",
        solution:
          "Ich entwickle Crispy Billiards als vollständiges Steam-Spiel: mit eigener Stoßsteuerung, synchronisierten Online-Partien, Lobbys, Regel- und Rundenlogik sowie Shop und Inventar. Das Projekt befindet sich aktiv in Entwicklung und wird derzeit für den Steam-Launch und externe Playtests vorbereitet.",
        implementation:
          "Crispy Billiards entsteht in Unity. Mirror übernimmt die Netzwerklogik, während FizzySteamworks die Verbindung zu Steam unterstützt. Eine zentrale Herausforderung ist es, Physik, Matchzustand und Benutzeroberfläche zwischen Host und Gast konsistent zu halten und gleichzeitig ein präzises Spielgefühl zu erreichen.",
        highlights: [
          {
            title: "Spielphysik und Stoßsteuerung",
            description:
              "Kraft, Zielrichtung und Treffpunkt am Spielball greifen zusammen, damit Stöße präzise und nachvollziehbar ausgeführt werden können.",
          },
          {
            title: "Online-1v1 und Steam-Lobbys",
            description:
              "Host- und Gastabläufe, Einladungen, Bereitschaftsstatus und Matchstart bilden den vollständigen Einstieg in eine Online-Partie.",
          },
          {
            title: "Regeln und Matchablauf",
            description:
              "Spielerwechsel, Fouls, Ball in Hand, Zeitlimit und Kamerazustände werden zu einem nachvollziehbaren Rundenablauf verbunden.",
          },
          {
            title: "Shop, Inventar und Skins",
            description:
              "Kosmetische Inhalte für Tische und Queues lassen sich über einen eigenen Shop- und Inventarablauf auswählen und im Spiel verwenden.",
          },
        ],
        services: [
          "Gameplay-Entwicklung",
          "Physik-Abstimmung",
          "Mehrspieler-Networking",
          "UI und Menüs",
        ],
        features: [
          "Online-1v1-Matches",
          "Steam-Lobbys",
          "Stoßsteuerung",
          "Shop und Inventar",
          "Regel- und Matchablauf",
        ],
        ctaLabel: "Projekt ansehen",
        seoTitle: "Crispy Billiards | Chris Leon Noltemeier",
        seoDescription:
          "Aktiv entwickeltes 3D-Online-Billardspiel für Steam mit physikbasiertem Gameplay, 1v1-Multiplayer, Lobbys und eigener Benutzeroberfläche.",
      },
  },
];

export function getProjectByRouteSlug(routeSlug: string): ProjectCaseStudy | undefined {
  return projects.find((p) => p.routeSlug === routeSlug);
}

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectCaseStudy[] {
  return projects
    .filter((p) => p.visibility === "featured")
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
}

export function getSecondaryProjects(): ProjectCaseStudy[] {
  return projects
    .filter((p) => p.visibility === "secondary")
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
}

export function getArchiveProjects(): ProjectCaseStudy[] {
  return projects
    .filter((p) => p.visibility === "archive")
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
}

/**
 * Homepage "Ausgewählte Projekte" grid.
 * Equestrian work lives in ProjectReferencesSection instead.
 */
export function getPreviewProjects(): ProjectCaseStudy[] {
  return projects
    .filter((p) => p.industry !== "equestrian")
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
}

/** @deprecated use getFeaturedProjects */
export function getHomepageProjects(): ProjectCaseStudy[] {
  return getFeaturedProjects();
}
