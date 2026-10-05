import type {
  NavItem,
  ProcessStep,
  ServiceItem,
  TechTrustItem,
} from "~/types/content";

export const mainNavItems: NavItem[] = [
  { id: "home", hash: "home" },
  { id: "projects", hash: "projects" },
];

export const contactPath = "/kontakt" as const;

export const services: ServiceItem[] = [
  {
    id: "consulting",
    imageSrc: "/images/cards/consulting.png",
    imageAlt: "Vom offenen Projekt zum klaren Ziel",
  },
  {
    id: "concept",
    imageSrc: "/images/cards/concept.png",
    imageAlt: "Hierarchische Website-Struktur als 3D-Komposition",
  },
  {
    id: "design",
    imageSrc: "/images/cards/design.png",
    imageAlt: "Dreistufige Webführung zum blauen Aktionsbutton",
  },
  {
    id: "websitesShops",
    imageSrc: "/images/cards/websites-shops.png",
    imageAlt: "Responsives E-Commerce auf Desktop und Smartphone",
  },
  {
    id: "webapps",
    imageSrc: "/images/cards/webapps.png",
    imageAlt: "Vernetztes Dashboard für individuelle Webanwendungen",
  },
  {
    id: "automation",
    imageSrc: "/images/cards/automation.png",
    imageAlt: "Automatisierter Workflow zum Website-Launch",
  },
];

export const processSteps: ProcessStep[] = [
  { id: "understand", step: 1 },
  { id: "build", step: 2 },
  { id: "launch", step: 3 },
];

export const techTrustItems: TechTrustItem[] = [
  { id: "ts", label: "TypeScript" },
  { id: "vue", label: "Vue / Nuxt" },
  { id: "node", label: "Node.js" },
  { id: "pg", label: "PostgreSQL" },
  { id: "shopify", label: "Shopify" },
];

export const paths = {
  home: "/",
  impressum: "/impressum",
  datenschutz: "/datenschutz",
  lebenslauf: "/lebenslauf",
  danke: "/danke",
  contact: contactPath,
  websiteLanding: "/website-erstellen-lassen",
  projects: "/#projects",
} as const;

export function projectDetailPath(routeSlug: string): string {
  return "/projekte/" + routeSlug;
}
