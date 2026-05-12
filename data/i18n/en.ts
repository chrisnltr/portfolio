import type { AppTranslations } from "~/types/i18n";

export const en: AppTranslations = {
  nav: {
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
    ariaLabel: "Main navigation",
    menuToggle: "Toggle navigation menu",
    langSwitchDe: "Switch language to German",
    langSwitchEn: "Switch language to English",
  },
  hero: {
    greeting: "Hey, I'm",
    nameIntro: "Chris Leon Noltemeier",
    roleHeadline: "Full-Stack Developer",
    positioningLine:
      "Full-Stack Developer | Automation & API Integrations | AI-enabled workflows",
    openToWorkBadge: "Open to work",
    locationLabel: "Based in Bad Essen · Remote friendly",
  },
  about: {
    title: "About Me",
    paragraphs: [
      "I’m Chris Leon Noltemeier, a full-stack developer focused on building efficient, user-friendly applications that solve real-world problems. I like to take ideas from first prototype to production and keep iteration cycles short.",
      "My experience covers modern frontend frameworks, scalable backend systems and cloud infrastructure. I care about clean, maintainable code and pragmatic architecture that still leaves room to grow.",
      "I enjoy improving workflows through automation and well-designed internal tools – from intuitive UIs to robust APIs and infrastructure that teams can rely on.",
    ],
  },
  impact: {
    title: "Impact & Highlights",
    items: [
      {
        title: "Automation & internal tools",
        description:
          "Designed and implemented internal tools and workflows to reduce manual effort in daily operations. // TODO: Add concrete % or hours saved once available.",
      },
      {
        title: "API integrations",
        description:
          "Built and maintained API integrations around existing business systems to keep data in sync and reduce duplicated work.",
      },
      {
        title: "Developer experience",
        description:
          "Introduced modern tooling, typed APIs and cleaner architecture to make features easier to ship and maintain.",
      },
    ],
  },
  experience: {
    title: "Experience & Education",
    workHeadline: "Work Experience",
    educationHeadline: "Education",
    naueGroup: {
      title: "Software Developer · Naue Group",
      employmentType: "Full-time",
      dateRange: "June 2025 – Present",
      bullets: [
        {
          text: "Developed internal web tools to support logistics, production and quality workflows close to SAP processes.",
        },
        {
          text: "Implemented REST APIs and integrations between existing systems to reduce manual data entry and Excel-based processes.",
        },
        {
          text: "Worked across the full stack with TypeScript, Vue/Nuxt, Node.js, PostgreSQL and cloud infrastructure.",
        },
        {
          text: "Collaborated closely with domain experts, gathering requirements and iterating quickly on prototypes.",
        },
        {
          text: "Participated in agile ceremonies, grooming and deployment planning with cross-functional stakeholders.",
        },
      ],
    },
    apprenticeship: {
      title: "IT Specialist Application Development",
      description: "Apprenticeship · Berufskolleg Lübbecke",
      dateRange: "Aug 2022 – June 2025",
    },
    school: {
      title: "Technical College Certificate in Computer Science",
      description: "Technical high school diploma · Berufskolleg Lübbecke",
      dateRange: "Aug 2020 – July 2022",
    },
  },
  projects: {
    title: "My Projects",
    caseStudyModalClose: "Close case study",
    galleryLabel: "Project images",
    prevImage: "Previous image",
    nextImage: "Next image",
  },
  automationAi: {
    title: "Automation & AI",
    subtitle:
      "Helping teams automate workflows, connect tools and ship AI-enabled features that actually integrate into existing processes.",
    useCases: [
      {
        title: "n8n workflows",
        description:
          "Design and implement automations that connect CRMs, support systems and internal tools, including webhooks, retries and monitoring.",
      },
      {
        title: "API-first integrations",
        description:
          "Plan and build robust REST APIs for existing systems so automations and AI agents can reliably read and write business data.",
      },
      {
        title: "LLM-enabled internal tools",
        description:
          "Augment existing applications with LLM-based assistants (summarisation, drafting, classification) while keeping humans in control.",
      },
    ],
  },
  contact: {
    title: "Get in touch",
    intro:
      "I’m open to full-time roles, freelancing and collaboration around automation, integrations and developer tooling.",
    nameLabel: "Name",
    emailLabel: "Email",
    topicLabel: "Topic (optional)",
    messageLabel: "Message",
    submitLabel: "Send message",
    submittingLabel: "Sending…",
    successMessage: "Thanks for your message! I’ll get back to you shortly.",
    errorMessage:
      "Something went wrong while sending your message. Please try again or reach out via LinkedIn or email.",
    validationNameRequired: "Please enter your name.",
    validationEmailRequired: "Please enter your email address.",
    validationEmailInvalid: "Please enter a valid email address.",
    validationMessageRequired: "Please enter a short message.",
    spamProtectionLabel: "Leave this field empty (spam protection).",
  },
  seo: {
    title: "Chris Leon Noltemeier – Full-Stack Developer (Automation, APIs & AI Workflows)",
    description:
      "Portfolio of Chris Leon Noltemeier, full-stack developer from Bad Essen focused on automation, API integrations and AI-enabled internal tools.",
    ogTitle:
      "Chris Leon Noltemeier – Full-Stack Developer for Automation & Integrations",
    ogDescription:
      "Helping teams ship reliable internal tools, APIs and AI-enabled workflows across the full stack.",
  },
  social: {
    githubLabel: "Open GitHub profile",
    linkedinLabel: "Open LinkedIn profile",
    emailLabel: "Send email",
  },
  footer: {
    datenschutz: "Datenschutz",
    privacy: "Privacy Policy",
  },
};

