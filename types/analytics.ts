export type WebsiteCtaPlacement =
  | "hero"
  | "projects"
  | "process"
  | "pricing"
  | "final"
  | "unknown";

export type FunnelStepName = "needs" | "budget" | "details";

export type FunnelBudgetBand =
  | "under_1500"
  | "1500_3000"
  | "3000_6000"
  | "over_6000"
  | "open";

export type ContactFormErrorType =
  | "validation"
  | "network"
  | "server"
  | "captcha"
  | "unknown";

export type AnalyticsEventName =
  | "cta_click"
  | "project_view"
  | "contact_form_start"
  | "website_landing_view"
  | "website_cta_click"
  | "contact_funnel_start"
  | "contact_funnel_step_view"
  | "contact_funnel_step_complete"
  | "contact_form_submit_attempt"
  | "contact_form_submit_success"
  | "contact_form_submit_error"
  | "website_analysis_request"
  | "email_click"
  | "phone_click"
  | "external_project_click";

/** Datensparsame Event-Eigenschaften. Keine Nachrichten, E-Mails oder Telefonnummern. */
export type AnalyticsEventProps = {
  page?: string;
  location?: string;
  project?: string;
  /** Non-PII funnel context, e.g. `"website"`. Never form field values. */
  project_type?: string;
  service?: string;
  language?: string;
  status?: string;
  page_type?: "website_landing";
  cta_placement?: WebsiteCtaPlacement;
  destination?: "contact_funnel";
  step_number?: number;
  step_name?: FunnelStepName;
  budget_band?: FunnelBudgetBand;
  error_type?: ContactFormErrorType;
  /** First-touch Ads / UTM attribution (allowlisted; no PII). */
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  initial_landing_path?: string;
  initial_referrer_host?: string;
  /** Server-issued inquiry id for Ads conversion dedup. Never client-generated. */
  transaction_id?: string;
};

export type TrackingIds = {
  gaMeasurementId: string;
  googleAdsId: string;
  googleAdsConversionLabel: string;
  metaPixelId: string;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}
