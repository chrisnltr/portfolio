/** Default social preview (1200×630). Replace with branded art when available. */
export const DEFAULT_OG_IMAGE = "/og-default.png";

export type SeoCopy = {
  title: string;
  description: string;
};

export const homeSeo: SeoCopy = {
  title: "Chris Leon Noltemeier | Websites, Software und Automatisierung",
  description:
    "Websites, Shopify-Shops und individuelle Software aus Bad Essen. Persönlich umgesetzt für kleine Unternehmen.",
};

export const resumeSeo: SeoCopy = {
  title: "Lebenslauf | Chris Leon Noltemeier",
  description:
    "Berufsweg und Stationen von Chris Leon Noltemeier: Web- und Softwareentwicklung, freiberufliche Projekte und technische Schwerpunkte.",
};

export const contactSeo: SeoCopy = {
  title: "Kontakt | Chris Leon Noltemeier",
  description:
    "Projekt anfragen: Websites, Shopify, Software und Automatisierung. Persönliche Rückmeldung aus Bad Essen.",
};

export const imprintSeo: SeoCopy = {
  title: "Impressum | Chris Leon Noltemeier",
  description: "Gesetzliche Anbieterkennzeichnung und Kontaktangaben.",
};

export const privacySeo: SeoCopy = {
  title: "Datenschutz | Chris Leon Noltemeier",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten, Cookies und optionalen Statistik- sowie Marketing-Diensten auf dieser Website.",
};

export const termsSeo: SeoCopy = {
  title: "AGB | Chris Leon Noltemeier",
  description:
    "Allgemeine Geschäftsbedingungen für Website-, Software- und Digitalprojekte von Chris Leon Noltemeier.",
};

export const thankYouSeo: SeoCopy = {
  title: "Vielen Dank | Chris Leon Noltemeier",
  description:
    "Ihre Anfrage wurde übermittelt. Ich melde mich persönlich bei Ihnen.",
};

export const projectSeo: Record<string, SeoCopy> = {
  "cantus-halle": {
    title: "Cantus-Halle | Case Study | Chris Leon Noltemeier",
    description:
      "Website und digitales Angebot für die Cantus-Halle: Struktur, Buchung und Auftritt für einen Veranstaltungsort.",
  },
  stallzentrale: {
    title: "Stallzentrale | Case Study | Chris Leon Noltemeier",
    description:
      "Eigenständig entwickeltes SaaS-Produkt für Aktiv-, Offen- und Pensionsställe, vom realen Pilotbetrieb bis zur mandantenfähigen Plattform.",
  },
  "ls-aktivstall": {
    title: "LS Aktivstall | Case Study | Chris Leon Noltemeier",
    description:
      "Live eingesetzte Kundenwebsite für einen Aktivstall in Stemwede mit Haltungskonzept, Anlage, Leistungen und gezielten Platzanfragen.",
  },
  "accident-report-app": {
    title: "CrashReport | Case Study | Chris Leon Noltemeier",
    description:
      "Mobile App für die geführte Unfallaufnahme mit Fotos, Karten-Skizze und PDF-Export, entstanden aus eigener Erfahrung.",
  },
};

export function personJsonLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Chris Leon Noltemeier",
    url: origin,
    jobTitle: "Web- und Softwareentwickler",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bad Essen",
      addressCountry: "DE",
    },
    sameAs: [
      "https://github.com/chrisnltr",
      "https://www.linkedin.com/in/chris-leon-noltemeier",
    ],
  };
}

export function professionalServiceJsonLd(origin: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Chris Leon Noltemeier",
    url: origin,
    description:
      "Websites, Shopify-Shops, individuelle Software und Automatisierung für kleine Unternehmen.",
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bad Essen",
      addressCountry: "DE",
    },
    founder: {
      "@type": "Person",
      name: "Chris Leon Noltemeier",
    },
  };
}

export function breadcrumbJsonLd(
  origin: string,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}
