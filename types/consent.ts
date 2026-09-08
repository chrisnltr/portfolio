export const CONSENT_VERSION = "2";
export const CONSENT_COOKIE_NAME = "portfolio_consent";
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months

/** Optional categories present in this project. Extend when new services are added. */
export type OptionalConsentCategory = "statistics" | "marketing";

export type ConsentCategories = {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
};

export type ConsentState = {
  version: string;
  decidedAt: string;
  categories: ConsentCategories;
};

export type ConsentDecisionInput = {
  statistics: boolean;
  marketing: boolean;
};

export const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  statistics: false,
  marketing: false,
};

export const CONSENT_SERVICES = [
  {
    id: "locale-preference",
    category: "necessary" as const,
    provider: "First-Party (diese Website)",
    purposeDe:
      "Speichert die vom Nutzer gewählte Sprache (Deutsch/Englisch), damit die bevorzugte Locale beim nächsten Besuch wiederhergestellt werden kann.",
    purposeEn:
      "Stores the language selected by the user (German/English) so the preferred locale can be restored on the next visit.",
    storageDe: "localStorage-Schlüssel „preferred_locale“",
    storageEn: "localStorage key “preferred_locale”",
    retentionDe: "Bis zur Löschung durch den Nutzer oder Leeren des Browser-Speichers",
    retentionEn: "Until deleted by the user or the browser storage is cleared",
    privacyUrl: null as string | null,
  },
  {
    id: "consent-storage",
    category: "necessary" as const,
    provider: "First-Party (diese Website)",
    purposeDe:
      "Speichert Ihre Einwilligungsentscheidung (Version, Zeitpunkt, aktivierte Kategorien), damit der Banner nicht bei jedem Besuch erneut erscheint.",
    purposeEn:
      "Stores your consent decision (version, timestamp, enabled categories) so the banner does not appear on every visit.",
    storageDe: `First-Party-Cookie „${CONSENT_COOKIE_NAME}“`,
    storageEn: `First-party cookie “${CONSENT_COOKIE_NAME}”`,
    retentionDe: "12 Monate",
    retentionEn: "12 months",
    privacyUrl: null as string | null,
  },
  {
    id: "vercel-analytics",
    category: "statistics" as const,
    provider: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA",
    purposeDe:
      "Erfassung anonymisierter bzw. pseudonymer Nutzungsstatistiken (z. B. Seitenaufrufe, benannte Events), um die Website zu verbessern. Wird erst nach Zustimmung geladen.",
    purposeEn:
      "Collects anonymized or pseudonymous usage statistics (e.g. page views, named events) to improve the website. Loaded only after consent.",
    storageDe:
      "Skript `/_vercel/insights/script.js` (Produktion) bzw. `va.vercel-scripts.com` (Entwicklung); typischerweise cookieless, Übermittlung von Nutzungsdaten an Vercel",
    storageEn:
      "Script `/_vercel/insights/script.js` (production) or `va.vercel-scripts.com` (development); typically cookieless, usage data transmitted to Vercel",
    retentionDe:
      "Siehe aktuelle Vercel-Datenschutzerklärung; Angabe wird bei Bedarf hier präzisiert",
    retentionEn:
      "See current Vercel privacy policy; details will be refined here as needed",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
  },
  {
    id: "google-analytics",
    category: "statistics" as const,
    provider:
      "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (ggf. Google LLC, USA)",
    purposeDe:
      "Optional: Webanalyse (z. B. Seitenaufrufe, Ereignisse), sofern eine Measurement-ID konfiguriert ist. Wird nur nach Statistik-Einwilligung und nur bei gesetzter ID geladen.",
    purposeEn:
      "Optional: web analytics (e.g. page views, events) when a measurement ID is configured. Loaded only after statistics consent and only if an ID is set.",
    storageDe:
      "Details zu Cookies und Speicher werden ergänzt, sobald eine Measurement-ID produktiv genutzt wird",
    storageEn:
      "Cookie and storage details will be added once a measurement ID is used in production",
    retentionDe: "Angabe folgt bei produktiver Aktivierung",
    retentionEn: "To be documented when activated in production",
    privacyUrl: "https://policies.google.com/privacy",
  },
  {
    id: "google-ads",
    category: "marketing" as const,
    provider:
      "Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland (ggf. Google LLC, USA)",
    purposeDe:
      "Optional: Messung von Werbe-Conversions und Remarketing, sofern Ads-IDs konfiguriert sind. Wird nur nach Marketing-Einwilligung und nur bei gesetzten IDs geladen.",
    purposeEn:
      "Optional: ad conversion measurement and remarketing when Ads IDs are configured. Loaded only after marketing consent and only if IDs are set.",
    storageDe:
      "Details zu Cookies und Speicher werden ergänzt, sobald Ads-IDs produktiv genutzt werden",
    storageEn:
      "Cookie and storage details will be added once Ads IDs are used in production",
    retentionDe: "Angabe folgt bei produktiver Aktivierung",
    retentionEn: "To be documented when activated in production",
    privacyUrl: "https://policies.google.com/privacy",
  },
  {
    id: "meta-pixel",
    category: "marketing" as const,
    provider: "Meta Platforms Ireland Limited, Dublin (ggf. Meta Platforms, Inc., USA)",
    purposeDe:
      "Optional: Messung von Marketing-Ereignissen (Pixel), sofern eine Pixel-ID konfiguriert ist. Wird nur nach Marketing-Einwilligung und nur bei gesetzter ID geladen.",
    purposeEn:
      "Optional: marketing event measurement (pixel) when a pixel ID is configured. Loaded only after marketing consent and only if an ID is set.",
    storageDe:
      "Details zu Cookies und Speicher werden ergänzt, sobald eine Pixel-ID produktiv genutzt wird",
    storageEn:
      "Cookie and storage details will be added once a pixel ID is used in production",
    retentionDe: "Angabe folgt bei produktiver Aktivierung",
    retentionEn: "To be documented when activated in production",
    privacyUrl: "https://www.facebook.com/privacy/policy/",
  },
] as const;
