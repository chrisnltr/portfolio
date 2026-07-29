export const CONSENT_VERSION = "1";
export const CONSENT_COOKIE_NAME = "portfolio_consent";
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 12 months

/** Optional categories present in this project. Extend when new services are added. */
export type OptionalConsentCategory = "statistics";

export type ConsentCategories = {
  necessary: true;
  statistics: boolean;
};

export type ConsentState = {
  version: string;
  decidedAt: string;
  categories: ConsentCategories;
};

export type ConsentDecisionInput = {
  statistics: boolean;
};

export const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  statistics: false,
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
      "Erfassung anonymisierter bzw. pseudonymer Nutzungsstatistiken (z. B. Seitenaufrufe), um die Website zu verbessern. Wird erst nach Zustimmung geladen.",
    purposeEn:
      "Collects anonymized or pseudonymous usage statistics (e.g. page views) to improve the website. Loaded only after consent.",
    storageDe:
      "Skript `/_vercel/insights/script.js` (Produktion) bzw. `va.vercel-scripts.com` (Entwicklung); typischerweise cookieless, Übermittlung von Nutzungsdaten an Vercel",
    storageEn:
      "Script `/_vercel/insights/script.js` (production) or `va.vercel-scripts.com` (development); typically cookieless, usage data transmitted to Vercel",
    retentionDe:
      "TODO: Speicherdauer bei Vercel laut aktueller Vercel-Datenschutzerklärung prüfen und hier ergänzen",
    retentionEn:
      "TODO: Confirm retention period with Vercel’s current privacy policy and document here",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
  },
] as const;
