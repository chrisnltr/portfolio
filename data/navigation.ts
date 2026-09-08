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

export const contactNavHash = "contact" as const;

export const services: ServiceItem[] = [
  { id: "websitesShops" },
  { id: "webapps" },
  { id: "automation" },
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
  projects: "/#projects",
} as const;

export function projectDetailPath(routeSlug: string): string {
  return "/projekte/" + routeSlug;
}
