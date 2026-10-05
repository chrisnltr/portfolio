import { projectDetailPath } from "~/data/navigation";
import { projects } from "~/data/projects";

export type WebsiteLandingMedia =
  | {
      kind: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
    }
  | {
      kind: "placeholder";
      badge: string;
      title: string;
      description: string;
      formatLabel: string;
      animationHint: string;
      mobileDescription?: string;
    };

export type WebsiteLandingProject = {
  id: string;
  routeSlug: string;
  title: string;
  positioning: string;
  situation: string;
  description: string;
  features: string[];
  media: WebsiteLandingMedia;
  caseStudyPath: string;
  mediaSide: "left" | "right";
};

export type LandingTestimonial = {
  id: string;
  quote: string;
  customerName: string;
  role: string;
  company: string;
  projectType: string;
  image: string | null;
  logo: string | null;
  isDraft: boolean;
  draft: {
    badge: string;
    title: string;
    brief: string;
    needed: string[];
    imageHint: string;
  };
};

function projectBySlug(slug: string) {
  const project = projects.find((item) => item.slug === slug);
  if (!project) {
    throw new Error(`Missing project data for landing page: ${slug}`);
  }
  return project;
}

const cantus = projectBySlug("cantus-halle");
const stallzentrale = projectBySlug("stallzentrale");

/**
 * Website-landing showcase only. Does not alter the global portfolio list.
 * Allowed here: commercial website / shop / SaaS web presence projects.
 */
export const websiteLandingProjects: WebsiteLandingProject[] = [
  {
    id: cantus.slug,
    routeSlug: cantus.routeSlug,
    title: cantus.content.title,
    positioning: "Website & Shopify-Shop",
    situation: cantus.content.situation,
    description:
      "Ein zusammenhängender Webauftritt mit Unternehmenswebsite und Shopify-Shop für individuell gefertigte Produkte aus dem Pferdebereich.",
    features: [
      "Unternehmenswebsite",
      "Shopify-Shop",
      "Produktdarstellung",
      "Mobile Optimierung",
      "Einheitlicher visueller Auftritt",
    ],
    media: {
      kind: "placeholder",
      badge: "TEMPORÄRER PROJEKT-ASSET-PLATZHALTER",
      title: "Cantus-Halle Website und Shopify-Shop",
      description:
        "Hier später eine kombinierte Darstellung aus Startseite und Shop einsetzen. Hauptansicht als Desktop-Browser-Mockup, ergänzt durch eine kleinere mobile Produktansicht.",
      formatLabel: "Desktop ungefähr 16:10, mobil responsiv",
      animationHint:
        "Beim Scrollen erscheint zuerst die große Website-Ansicht, danach leicht zeitversetzt die kleinere Shop- oder Mobile-Ansicht.",
      mobileDescription:
        "Desktop: großes Browser-Mockup mit Shop-Ergänzung. Mobil: eine klare Hauptansicht, optional ein kleines Zweitbild darunter.",
    },
    caseStudyPath: projectDetailPath(cantus.routeSlug),
    mediaSide: "left",
  },
  {
    id: stallzentrale.slug,
    routeSlug: stallzentrale.routeSlug,
    title: stallzentrale.content.title,
    positioning: "Website & digitale Plattform",
    situation: stallzentrale.content.situation,
    description:
      "Ein digitaler Webauftritt für eine Plattform, die wiederkehrende Abläufe in Aktiv-, Offen- und Pensionsställen zentral organisiert.",
    features: [
      "Marketingwebsite",
      "Responsive Produktdarstellung",
      "Klare Erklärung der Plattform",
      "Buchungen und Verwaltung",
      "Dashboard- und Prozessdarstellung",
    ],
    media: {
      kind: "image",
      src: stallzentrale.images[0]?.src || stallzentrale.previewImage!.src,
      alt:
        stallzentrale.images[0]?.alt ||
        stallzentrale.previewImage!.alt ||
        "Stallzentrale Marketingwebsite",
      width: stallzentrale.images[0]?.width || stallzentrale.previewImage!.width,
      height:
        stallzentrale.images[0]?.height || stallzentrale.previewImage!.height,
    },
    caseStudyPath: projectDetailPath(stallzentrale.routeSlug),
    mediaSide: "right",
  },
];

export const websiteLandingTestimonials: LandingTestimonial[] = [
  {
    id: "cantus-halle",
    quote: "",
    customerName: "",
    role: "",
    company: "Cantus-Halle",
    projectType: "Website & Shopify-Shop",
    image: null,
    logo: null,
    isDraft: true,
    draft: {
      badge: "KUNDENSTIMME NOCH EINHOLEN",
      title: "Cantus-Halle – Website & Shopify-Shop",
      brief:
        "Benötigt wird eine echte, freigegebene Kundenstimme mit 2–4 Sätzen zu: Verständnis der Wünsche, persönliche Kommunikation, Umsetzung von Website und Shop sowie Zufriedenheit mit dem fertigen Ergebnis.",
      needed: [
        "Vollständiger oder freigegebener Vorname",
        "Funktion beziehungsweise Rolle",
        "Unternehmensname",
        "Optionales Kundenfoto oder Logo",
        "Ausdrückliche Freigabe zur Veröffentlichung",
      ],
      imageHint:
        "Optional: rundes Kundenfoto oder kleines Unternehmenslogo. Falls kein Bild freigegeben wird, eine neutrale finale Initialenfläche verwenden.",
    },
  },
  {
    id: "stallzentrale",
    quote: "",
    customerName: "",
    role: "",
    company: "Stallzentrale",
    projectType: "Website & individuelle Plattform",
    image: null,
    logo: null,
    isDraft: true,
    draft: {
      badge: "KUNDENSTIMME NOCH EINHOLEN",
      title: "Stallzentrale – Website & individuelle Plattform",
      brief:
        "Benötigt wird eine echte, freigegebene Kundenstimme mit 2–4 Sätzen zu: Verständnis der Stallabläufe, persönlicher Abstimmung, Nutzen der zentralen Lösung und Erfahrung während der Umsetzung.",
      needed: [
        "Vollständiger oder freigegebener Vorname",
        "Rolle beziehungsweise Stallbezug",
        "Stall- oder Unternehmensname",
        "Optionales Kundenfoto oder Logo",
        "Ausdrückliche Freigabe zur Veröffentlichung",
      ],
      imageHint:
        "Optional: rundes Kundenfoto oder kleines Unternehmenslogo. Falls kein Bild freigegeben wird, eine neutrale finale Initialenfläche verwenden.",
    },
  },
];

export const websiteLandingProcessSteps = [
  {
    id: "request",
    title: "Kurze Projektanfrage",
    description:
      "Sie beantworten in etwa 60 Sekunden einige kurze Fragen zu Ihrer gewünschten Website, dem aktuellen Stand und Ihrem ungefähren Budget.",
    note: "Kostenlos und unverbindlich",
  },
  {
    id: "call",
    title: "Persönliches Erstgespräch",
    description:
      "Ich melde mich persönlich bei Ihnen. In einem kurzen Gespräch klären wir Ihre Ziele, die aktuelle Situation und ob ich Sie sinnvoll unterstützen kann.",
    note: "In der Regel ca. 15 Minuten",
  },
  {
    id: "offer",
    title: "Empfehlung und transparentes Angebot",
    description:
      "Sie erhalten eine verständliche Empfehlung zu Seitenumfang, Funktionen, Ablauf und Kosten. Erst danach entscheiden Sie in Ruhe, ob wir zusammenarbeiten.",
    note: "Keine Verpflichtung durch das Erstgespräch",
  },
  {
    id: "build",
    title: "Design, Umsetzung und Livegang",
    description:
      "Wenn alles passt, entwickle ich Struktur und Design, setze die Website technisch um und begleite Sie bis zur Veröffentlichung.",
    note: "Direkte Abstimmung ohne Agenturumwege",
  },
] as const;

export const websiteLandingConsultationPoints = [
  {
    id: "situation",
    title: "Aktuelle Situation",
    description:
      "Wir schauen uns an, ob bereits eine Website vorhanden ist, was daran aktuell nicht funktioniert und wie Ihr Unternehmen online wahrgenommen werden soll.",
  },
  {
    id: "scope",
    title: "Ziele und benötigter Umfang",
    description:
      "Wir klären, welche Inhalte, Seiten und Funktionen tatsächlich sinnvoll sind – ohne unnötige Extras einzuplanen.",
  },
  {
    id: "next",
    title: "Realistische nächste Schritte",
    description:
      "Sie erhalten eine ehrliche Einschätzung zu möglichem Umfang, Ablauf, Zeitrahmen und Budget. Danach können Sie in Ruhe entscheiden.",
  },
] as const;

export const websiteLandingTrustNotes = [
  "Kostenlos und unverbindlich",
  "Kein vorbereitetes Konzept nötig",
  "Persönliches Gespräch direkt mit Chris",
  "Keine automatische Vertragsbindung",
] as const;

export type WebsiteLandingFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const websiteLandingFaqItems: WebsiteLandingFaqItem[] = [
  {
    id: "cost",
    question: "Was kostet eine professionelle Website?",
    answer:
      "Die Kosten hängen vom Umfang, den gewünschten Funktionen und den vorhandenen Inhalten ab. Nach dem Erstgespräch erhalten Sie ein transparentes, individuelles Angebot. Zusätzliche oder laufende Kosten werden vor Projektbeginn klar benannt.",
  },
  {
    id: "duration",
    question: "Wie lange dauert die Erstellung einer Website?",
    answer:
      "Eine kleinere Unternehmenswebsite kann in der Regel innerhalb weniger Wochen umgesetzt werden. Der genaue Zeitrahmen hängt unter anderem vom Umfang, der Bereitstellung der Inhalte und den Feedbackrunden ab. Vor dem Projektstart erhalten Sie einen realistischen Ablaufplan.",
  },
  {
    id: "content",
    question: "Müssen Texte und Bilder bereits fertig sein?",
    answer:
      "Nein. Für den Start reichen zunächst die wichtigsten Informationen zu Ihrem Unternehmen, Ihrem Angebot und Ihrer Zielgruppe. Gemeinsam klären wir, welche Inhalte bereits vorhanden sind und welche Texte, Bilder oder Grafiken noch benötigt werden.",
  },
  {
    id: "domain",
    question: "Kann meine bestehende Domain weiterverwendet werden?",
    answer:
      "In den meisten Fällen ja. Vor der Umsetzung werden der aktuelle Anbieter, die vorhandenen Zugänge und die technische Ausgangslage geprüft. Anschließend kann die neue Website mit der bestehenden Domain verbunden werden.",
  },
  {
    id: "editing",
    question: "Kann ich Inhalte später selbst bearbeiten?",
    answer:
      "Das hängt vom gewählten System und dem gewünschten Aufbau ab. Häufig benötigte Inhalte können auf Wunsch so vorbereitet werden, dass sie später selbst gepflegt werden können. Alternativ können zukünftige Änderungen auch übernommen werden.",
  },
  {
    id: "shops",
    question: "Erstellst du auch Onlineshops?",
    answer:
      "Ja. Neben Unternehmenswebsites können auch Shopify-Shops geplant und umgesetzt werden. Im Erstgespräch klären wir, welche Produkte, Zahlungsarten, Versandregeln und weiteren Funktionen benötigt werden.",
  },
  {
    id: "consultation",
    question: "Ist das Erstgespräch kostenlos und unverbindlich?",
    answer:
      "Ja. Im ersten Gespräch geht es darum, Ihr Vorhaben, Ihre Ziele und die wichtigsten Anforderungen kennenzulernen. Das Gespräch ist kostenlos und unverbindlich. Danach entscheiden Sie in Ruhe, ob Sie ein Angebot erhalten möchten.",
  },
];

export const websiteLandingFinalCtaTrustPoints = [
  "Direkter persönlicher Kontakt",
  "Keine fertige Projektbeschreibung nötig",
  "Transparente nächste Schritte",
] as const;
