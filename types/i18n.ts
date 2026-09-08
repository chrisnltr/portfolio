/** Site is German-only; kept for a few API payloads that still send language. */
export type AppLocale = "de";

export type NavSection = {
  home: string;
  projects: string;
  contact: string;
  resume: string;
  brandName: string;
  brandMark: string;
  ariaLabel: string;
  menuToggle: string;
  menuClose: string;
};



export type HeroSection = {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  trustLine: string;
};

export type TrustStripSection = {
  items: string[];
};

export type ServiceCopy = {
  title: string;
  description: string;
};

export type ServicesSection = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Record<string, ServiceCopy>;
};

export type AboutSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  trustItems: string[];
  techLoopLabel: string;
  profileRole: string;
  ctaLabel: string;
  photoLabel: string;
  photoHint: string;
};

export type ExperienceBullet = {
  text: string;
};

export type ExperienceEntryTranslation = {
  title: string;
  employmentType: string;
  dateRange: string;
  bullets: ExperienceBullet[];
};

export type ExperienceEducationEntryTranslation = {
  title: string;
  description: string;
  dateRange: string;
};

export type ExperienceSection = {
  title: string;
  workHeadline: string;
  educationHeadline: string;
  intro: string;
  freelance: ExperienceEntryTranslation;
  naueGroup: ExperienceEntryTranslation;
  apprenticeship: ExperienceEducationEntryTranslation;
  school: ExperienceEducationEntryTranslation;
};

export type ProjectsSectionTranslations = {
  title: string;
  subtitle: string;
  featuredTitle: string;
  secondaryTitle: string;
  archiveTitle: string;
  viewDetails: string;
  previewLabel: string;
  previewHint: string;
  coverMetaFallback: string;
  situationLabel: string;
  goalLabel: string;
  solutionLabel: string;
  storyTitle: string;
  highlightsTitle: string;
  technicalTitle: string;
  moreTechnologies: string;
  servicesLabel: string;
  implementationLabel: string;
  featuresLabel: string;
  techLabel: string;
  statusLabel: string;
  industryLabel: string;
  roleFactLabel: string;
  platformFactLabel: string;
  galleryLabel: string;
  backToProjects: string;
  allProjects: string;
  breadcrumbHome: string;
  breadcrumbProjects: string;
  nextProject: string;
  requestProject: string;
  discussProject: string;
  closingCtaPrompt: string;
  visitLive: string;
  noImagesHint: string;
};

export type ProcessStepCopy = {
  title: string;
  description: string;
};

export type ProcessSection = {
  label: string;
  title: string;
  body: string;
  steps: Record<string, ProcessStepCopy>;
};

export type ClosingCtaSection = {
  title: string;
  body: string;
  primaryCta: string;
  emailCta: string;
};

export type ProjectReferenceId =
  | "cantus-halle"
  | "ls-aktivstall"
  | "stallzentrale";

export type ProjectReferencesSection = {
  title: string;
  subtitle: string;
  situationLabel: string;
  areasLabel: string;
  statusLabel: string;
  viewCaseStudy: string;
  inDevelopmentBadge: string;
  items: Record<
    ProjectReferenceId,
    {
      title: string;
      situation: string;
      areas: string[];
      status: string;
    }
  >;
};

export type ThankYouPage = {
  title: string;
  body: string;
  backHome: string;
  projectsLink: string;
};

export type ResumePage = {
  title: string;
  subtitle: string;
  backHome: string;
  seoTitle: string;
  seoDescription: string;
};

export type ContactSection = {
  label: string;
  title: string;
  intro: string;
  roleLine: string;
  personalReply: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  optionalHint: string;
  messageLabel: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  notConfiguredMessage: string;
  rateLimitedMessage: string;
  turnstileFailedMessage: string;
  turnstileUnavailable: string;
  validationNameRequired: string;
  validationEmailRequired: string;
  validationEmailInvalid: string;
  validationMessageRequired: string;
  validationTurnstileRequired: string;
  spamProtectionLabel: string;
  privacyConsentLabel: string;
  validationPrivacyRequired: string;
};

export type SeoSection = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
};

export type SocialTranslations = {
  githubLabel: string;
  linkedinLabel: string;
  emailLabel: string;
};

export type FooterSection = {
  datenschutz: string;
  impressum: string;
  agb: string;
  consentSettings: string;
  legalNavLabel: string;
};

export type ConsentBannerTranslations = {
  regionLabel: string;
  title: string;
  description: string;
  acceptAll: string;
  rejectAll: string;
  settings: string;
  privacy: string;
  imprint: string;
};

export type ConsentSettingsTranslations = {
  title: string;
  description: string;
  close: string;
  necessaryTitle: string;
  necessaryDescription: string;
  alwaysOn: string;
  statisticsTitle: string;
  statisticsDescription: string;
  marketingTitle: string;
  marketingDescription: string;
  provider: string;
  storage: string;
  retention: string;
  privacyHint: string;
  privacy: string;
  imprint: string;
  save: string;
  acceptAll: string;
  rejectAll: string;
  serviceLocale: string;
  serviceConsent: string;
  serviceAnalytics: string;
  serviceGa: string;
  serviceAds: string;
  serviceMeta: string;
};

export type ConsentTranslations = {
  banner: ConsentBannerTranslations;
  settings: ConsentSettingsTranslations;
};

export type AppTranslations = {
  nav: NavSection;
  hero: HeroSection;
  trustStrip: TrustStripSection;
  services: ServicesSection;
  about: AboutSection;
  experience: ExperienceSection;
  projects: ProjectsSectionTranslations;
  process: ProcessSection;
  closingCta: ClosingCtaSection;
  projectReferences: ProjectReferencesSection;
  thankYou: ThankYouPage;
  resume: ResumePage;
  contact: ContactSection;
  seo: SeoSection;
  social: SocialTranslations;
  footer: FooterSection;
  consent: ConsentTranslations;
};
