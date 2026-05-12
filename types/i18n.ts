export type AppLocale = "en" | "de";

export type NavSection = {
  home: string;
  about: string;
  experience: string;
  projects: string;
  contact: string;
  ariaLabel: string;
  menuToggle: string;
  langSwitchDe: string;
  langSwitchEn: string;
};

export type HeroSection = {
  greeting: string;
  nameIntro: string;
  roleHeadline: string;
  positioningLine: string;
  openToWorkBadge: string;
  locationLabel: string;
};

export type ImpactItem = {
  title: string;
  description: string;
};

export type ImpactSection = {
  title: string;
  items: ImpactItem[];
};

export type AboutSection = {
  title: string;
  paragraphs: string[];
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
  naueGroup: ExperienceEntryTranslation;
  apprenticeship: ExperienceEducationEntryTranslation;
  school: ExperienceEducationEntryTranslation;
};

export type ProjectTranslations = {
  title: string;
  subtitle: string;
  shortDescription: string;
  problem: string;
  solution: string;
  outcome: string;
  featuresTitle: string;
  techStackTitle: string;
  myContributionTitle: string;
  myContribution: string;
  biggestChallengeTitle: string;
  biggestChallenge: string;
  linksTitle: string;
  liveDemoLabel: string;
  githubLabel: string;
  codeOnRequestLabel: string;
  caseStudyCta: string;
};

export type ProjectsSectionTranslations = {
  title: string;
  caseStudyModalClose: string;
  galleryLabel: string;
  prevImage: string;
  nextImage: string;
};

export type AutomationUseCase = {
  title: string;
  description: string;
};

export type AutomationAiSection = {
  title: string;
  subtitle: string;
  useCases: AutomationUseCase[];
};

export type ContactSection = {
  title: string;
  intro: string;
  nameLabel: string;
  emailLabel: string;
  topicLabel: string;
  messageLabel: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  validationNameRequired: string;
  validationEmailRequired: string;
  validationEmailInvalid: string;
  validationMessageRequired: string;
  spamProtectionLabel: string;
};

export type SeoSection = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  /** Optional absolute URL for social share image (e.g. /og-image.png). */
  ogImage?: string;
};

export type SocialTranslations = {
  githubLabel: string;
  linkedinLabel: string;
  emailLabel: string;
};

export type FooterSection = {
  datenschutz: string;
  privacy: string;
};

export type AppTranslations = {
  nav: NavSection;
  hero: HeroSection;
  about: AboutSection;
  impact: ImpactSection;
  experience: ExperienceSection;
  projects: ProjectsSectionTranslations;
  automationAi: AutomationAiSection;
  contact: ContactSection;
  seo: SeoSection;
  social: SocialTranslations;
  footer: FooterSection;
};

