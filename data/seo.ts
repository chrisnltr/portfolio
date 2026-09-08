import { de } from "~/data/i18n/de";
import { projects } from "~/data/projects";
import { profile } from "~/data/profile";

/** Dedicated 1200×630 social preview; the square favicon remains unchanged. */
export const DEFAULT_OG_IMAGE = "/og-default.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/png";

export function getProjectSocialImage(project: (typeof projects)[number]): string {
  return project.socialImage || DEFAULT_OG_IMAGE;
}

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

const schemaContext = "https://schema.org";

function personId(origin: string) {
  return `${origin}/#person`;
}

function websiteId(origin: string) {
  return `${origin}/#website`;
}

function serviceId(origin: string, id: string) {
  return `${origin}/#service-${id}`;
}

function personNode(origin: string) {
  return {
    "@type": "Person",
    "@id": personId(origin),
    name: profile.name,
    url: origin,
    jobTitle: "Web- und Softwareentwickler",
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
      addressCountry: "DE",
    },
    sameAs: profile.socialLinks
      .filter((link) => link.type !== "email")
      .map((link) => link.url),
  };
}

function serviceNodes(origin: string) {
  return Object.entries(de.services.items).map(([id, service]) => ({
    "@type": "Service",
    "@id": serviceId(origin, id),
    name: service.title,
    description: service.description,
    provider: { "@id": personId(origin) },
    areaServed: {
      "@type": "Country",
      name: "Germany",
    },
  }));
}

function websiteNode(origin: string) {
  return {
    "@type": "WebSite",
    "@id": websiteId(origin),
    url: origin,
    name: profile.name,
    description: homeSeo.description,
    inLanguage: "de-DE",
    publisher: { "@id": personId(origin) },
  };
}

function projectNode(origin: string, project: (typeof projects)[number]) {
  const canonical = `${origin}/projekte/${project.routeSlug}`;
  const type =
    project.slug === "accident-report-app" ? "SoftwareApplication" : "CreativeWork";
  const node: Record<string, unknown> = {
    "@type": type,
    "@id": `${canonical}#project`,
    name: project.content.title,
    description: project.content.shortDescription,
    url: canonical,
    image: project.images[0]?.src
      ? `${origin}${project.images[0].src}`
      : undefined,
    keywords: project.technologies,
    genre: project.content.platformLabel,
  };

  if (project.externalUrl) {
    node.sameAs = project.externalUrl;
  }
  if (type === "SoftwareApplication") {
    node.applicationCategory = "UtilitiesApplication";
    node.operatingSystem = "Mobile";
  }
  if (project.ownership === "own-product") {
    node.creator = { "@id": personId(origin) };
  }
  return node;
}

export function portfolioJsonLd(
  origin: string,
  path: string,
  pageName = homeSeo.title,
) {
  const pageId = `${origin}${path}#webpage`;
  return {
    "@context": schemaContext,
    "@graph": [
      personNode(origin),
      websiteNode(origin),
      ...serviceNodes(origin),
      {
        "@type": "ProfessionalService",
        "@id": `${origin}/#professional-service`,
        name: profile.name,
        url: origin,
        description: homeSeo.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.location,
          addressCountry: "DE",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Leistungen",
          itemListElement: serviceNodes(origin).map((service) => ({
            "@type": "Offer",
            itemOffered: { "@id": service["@id"] },
          })),
        },
      },
      {
        "@type": "WebPage",
        "@id": pageId,
        url: `${origin}${path}`,
        name: pageName,
        isPartOf: { "@id": websiteId(origin) },
        about: { "@id": personId(origin) },
        inLanguage: "de-DE",
      },
    ],
  };
}

export function projectPortfolioJsonLd(
  origin: string,
  path: string,
  project: (typeof projects)[number],
) {
  const pageId = `${origin}${path}#webpage`;
  const projectId = `${origin}${path}#project`;
  return {
    "@context": schemaContext,
    "@graph": [
      personNode(origin),
      websiteNode(origin),
      projectNode(origin, project),
      {
        "@type": "WebPage",
        "@id": pageId,
        url: `${origin}${path}`,
        name: project.content.seoTitle,
        description: project.content.seoDescription,
        isPartOf: { "@id": websiteId(origin) },
        author: { "@id": personId(origin) },
        about: { "@id": projectId },
        mainEntity: { "@id": projectId },
        inLanguage: "de-DE",
      },
      breadcrumbNode(origin, [
        { name: "Startseite", path: "/" },
        { name: "Projekte", path: "/#projects" },
        { name: project.content.title, path },
      ]),
    ],
  };
}

export function breadcrumbJsonLd(
  origin: string,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": schemaContext,
    ...breadcrumbNode(origin, items),
  };
}

function breadcrumbNode(
  origin: string,
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}
