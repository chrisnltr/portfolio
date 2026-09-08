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
    `# ${profile.name}`,
    "",
    `> Web- und Softwareentwicklung aus ${profile.location}: Websites, Shopify-Shops, individuelle Webanwendungen und Automatisierung – persönlich umgesetzt.`,
    "",
    `Chris Leon Noltemeier arbeitet als Web- und Softwareentwickler in ${profile.location}. Die Case Studies zeigen eigene Produkte, Kundenarbeiten und ein internes Ausbildungsprojekt.`,
    "",
    "## Leistungen",
    "",
    "- Websites und Shopify-Shops",
    "- Individuelle Webanwendungen",
    "- Automatisierung und Schnittstellen",
    "",
    "## Projekte",
    "",
    ...projects.map(
      (project) =>
        `- [${project.content.title}](${origin}/projekte/${project.routeSlug}): ${project.content.shortDescription} (${project.ownership === "client-work" ? "Kundenarbeit" : project.ownership === "own-product" ? "eigenes Produkt" : "internes Projekt"})`,
    ),
    "",
    "## Kontakt und weitere Informationen",
    "",
    `- [Kontakt](${origin}/#contact)`,
    `- [Lebenslauf](${origin}/lebenslauf)`,
    `- [GitHub](${profile.socialLinks.find((link) => link.id === "github")?.url || `${origin}/#about`})`,
    `- [LinkedIn](${profile.socialLinks.find((link) => link.id === "linkedin")?.url || `${origin}/#about`})`,
    `- [Ausführliche Zusammenfassung](${origin}/llms-full.txt)`,
  ];

  setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
  setResponseHeader(event, "Cache-Control", "public, max-age=3600");
  return lines.join("\n") + "\n";
});
