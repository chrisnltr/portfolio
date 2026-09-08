export type SocialType = "github" | "linkedin" | "email";

export type SocialLink = {
  id: string;
  type: SocialType;
  url: string;
};

export type Profile = {
  name: string;
  shortName: string;
  location: string;
  email: string;
  openToWork: boolean;
  socialLinks: SocialLink[];
  /** Optional portrait under public/. Empty → placeholder. */
  portraitSrc?: string;
};

export type ProjectStatusId =
  | "in-progress"
  | "pilot"
  | "live"
  | "reference"
  | "archive";

export type ProjectVisibility = "featured" | "secondary" | "archive";

export type ProjectIndustryId =
  | "equestrian"
  | "mobility"
  | "internal-tools"
  | "entertainment";

export type ProjectVisualKind = "browser" | "phone" | "browser-phone";

/** Case-study page layout weighting */
export type CaseStudyLayout = "default" | "app" | "internal" | "archive";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind?: "desktop" | "mobile" | "other";
  /** Prefer loading for above-the-fold / hero use */
  priority?: boolean;
  /** CSS object-position for cropped hero/gallery frames */
  objectPosition?: string;
  fit?: "cover" | "contain";
  /** How the image is framed in galleries */
  presentation?: "default" | "phone-showcase";
};

export type ProjectHighlight = {
  title: string;
  description: string;
};

export type ProjectLocaleContent = {
  title: string;
  subtitle: string;
  shortDescription: string;
  statusLabel: string;
  industryLabel: string;
  /** Fact strip: role / scope of work */
  roleLabel: string;
  /** Fact strip: platform or project type */
  platformLabel: string;
  situation: string;
  goal: string;
  /** Case-study “Meine Lösung” (kept separate from homepage goal) */
  solution: string;
  implementation: string;
  highlights: ProjectHighlight[];
  /** Kept for homepage / legacy; not shown as long lists on case studies */
  services: string[];
  features: string[];
  ctaLabel: string;
  externalLinkLabel?: string;
  seoTitle: string;
  seoDescription: string;
};

export type ProjectCaseStudy = {
  slug: string;
  /** Public URL segment under /projekte */
  routeSlug: string;
  visibility: ProjectVisibility;
  homepageOrder?: number;
  status: ProjectStatusId;
  /** Describes whether the case study is an own product, client work, or internal project. */
  ownership: "own-product" | "client-work" | "internal-project";
  industry: ProjectIndustryId;
  visualKind: ProjectVisualKind;
  layout: CaseStudyLayout;
  /** Subtle project accent for eyebrows/numbers only */
  accent?: string;
  /** Show contact CTA in case-study closing (false for archive) */
  showContactCta?: boolean;
  technologies: string[];
  images: ProjectImage[];
  /**
   * Optional long full-page website screenshot for homepage card hover-scroll.
   * Falls back to first case-study image (static if not taller than viewport).
   */
  previewImage?: ProjectImage;
  /**
   * Desktop screenshots for homepage card hover-cycle (crossfade).
   * When set, the card uses CyclingProjectPreview instead of scroll preview.
   */
  cardCycleImages?: ProjectImage[];
  /** Dedicated 1200×630 social preview, generated from an approved project image. */
  socialImage?: string;
  /** Short category chips on homepage cards (max 3). Defaults to technologies. */
  cardTags?: string[];
  externalUrl?: string;
  /** When set, the homepage project card opens this URL instead of the case study. */
  homepageExternalUrl?: string;
  content: ProjectLocaleContent;
};

export type ServiceId = "websitesShops" | "webapps" | "automation";

export type ServiceItem = {
  id: ServiceId;
  href?: string;
};

export type ProcessStepId = "understand" | "build" | "launch";

export type ProcessStep = {
  id: ProcessStepId;
  step: number;
};

export type NavItemId = "home" | "projects";

export type NavItem = {
  id: NavItemId;
  hash: string;
};

export type TechTrustItem = {
  id: string;
  label: string;
};
