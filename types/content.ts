import type { AppLocale, ProjectTranslations } from "~/types/i18n";

export type SocialType = "github" | "linkedin" | "email";

export type SocialLink = {
  id: string;
  type: SocialType;
  url: string;
};

export type Profile = {
  name: string;
  location: string;
  openToWork: boolean;
  cv: Record<AppLocale, string>;
  socialLinks: SocialLink[];
};

export type ProjectLinkType = "live" | "github" | "code-request";

export type ProjectLinks = {
  liveUrl?: string;
  githubUrl?: string;
  codeIsPrivate?: boolean;
};

export type ProjectCaseStudy = {
  slug: string;
  images: string[];
  techStack: string[];
  translations: Record<AppLocale, ProjectTranslations>;
  links: ProjectLinks;
};

