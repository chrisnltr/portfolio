import { setResponseHeader } from "h3";
import type { H3Event } from "h3";
import { profile } from "~/data/profile";
import { projects } from "~/data/projects";

function getOrigin(event: H3Event) {
  const configured = process.env.NUXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;
  const host = event.node.req.headers.host || "localhost:3000";
  const forwarded = event.node.req.headers["x-forwarded-proto"];
  const proto = Array.isArray(forwarded) ? forwarded[0] : forwarded || "http";
  return `${proto}://${host}`;
}

export default defineEventHandler((event) => {
  const origin = getOrigin(event);
  const lines = [
    `# ${profile.name} – ausführliche Projektübersicht`,
    "",
    `Chris Leon Noltemeier ist Web- und Softwareentwickler aus ${profile.location}. Er setzt Websites, Shopify-Shops, individuelle Webanwendungen sowie Automatisierungen und Schnittstellen persönlich um.`,
    "",
    "## Arbeitsweise und Schwerpunkt",
    "",
    "Die Zusammenarbeit ist direkt und reicht von der Struktur und technischen Konzeption über die Umsetzung bis zum Livegang. Öffentliche Inhalte nennen nur belegte Projektangaben.",
    "",
    "## Projektübersicht",
    "",
    ...projects.flatMap((project) => [
      `### ${project.content.title}`,
      "",
      `- Einordnung: ${project.ownership === "client-work" ? "Kundenarbeit" : project.ownership === "own-product" ? "eigenes Produkt" : "internes Ausbildungsprojekt"}`,
      `- Status: ${project.content.statusLabel}`,
      `- Rolle: ${project.content.roleLabel}`,
      `- Typ: ${project.content.platformLabel}`,
      `- Technologien: ${project.technologies.join(", ")}`,
      `- Kurzbeschreibung: ${project.content.shortDescription}`,
      `- Case Study: ${origin}/projekte/${project.routeSlug}`,
      ...(project.externalUrl ? [`- Externe Projektseite: ${project.externalUrl}`] : []),
      "",
    ]),
    "## Links",
    "",
    `- Kontakt: ${origin}/#contact`,
    `- Lebenslauf: ${origin}/lebenslauf`,
    `- GitHub: ${profile.socialLinks.find((link) => link.id === "github")?.url || "nicht angegeben"}`,
    `- LinkedIn: ${profile.socialLinks.find((link) => link.id === "linkedin")?.url || "nicht angegeben"}`,
  ];

  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Cache-Control", "public, max-age=3600");
  return lines.join("\n") + "\n";
});
