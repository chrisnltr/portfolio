export type AnalyticsEventName =
  | "cta_click"
  | "project_view"
  | "contact_form_start"
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
  service?: string;
  language?: string;
  status?: string;
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
