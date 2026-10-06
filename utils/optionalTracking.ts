import type { AnalyticsEventName, AnalyticsEventProps, TrackingIds } from "~/types/analytics";
import {
  hasGaConfigured,
  hasGoogleAdsConfigured,
  hasMetaConfigured,
  sanitizeAnalyticsProps,
} from "~/utils/analyticsConfig";

const GTAG_SCRIPT_ID = "optional-gtag-js";
const META_SCRIPT_ID = "optional-meta-pixel";

/** Lead-success events that map to a Google Ads conversion. */
const LEAD_CONVERSION_EVENTS: ReadonlySet<AnalyticsEventName> = new Set([
  "contact_form_submit_success",
  "website_analysis_request",
]);

let googleTagBootstrapped = false;
let googleAdsConfigApplied = false;
let gaConfigApplied = false;
let missingAdsConfigWarned = false;

function ensureGtagStub(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
}

function warnMissingGoogleAdsConfig(ids: TrackingIds): void {
  if (!import.meta.dev || missingAdsConfigWarned) return;
  const hasId = Boolean(ids.googleAdsId);
  const hasLabel = Boolean(ids.googleAdsConversionLabel);
  if (hasId === hasLabel) return;
  missingAdsConfigWarned = true;
  console.warn(
    "[analytics] Google Ads lead conversion is incomplete: set both NUXT_PUBLIC_GOOGLE_ADS_ID and NUXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL. No conversion event will be sent.",
  );
}

/** Default Consent Mode v2: denied until user opts in. Not a substitute for consent UI. */
export function initGoogleConsentDefaults(): void {
  if (typeof window === "undefined") return;
  ensureGtagStub();
  window.gtag?.("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 500,
  });
}

export function updateGoogleConsent(options: {
  statistics: boolean;
  marketing: boolean;
}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: options.statistics ? "granted" : "denied",
    ad_storage: options.marketing ? "granted" : "denied",
    ad_user_data: options.marketing ? "granted" : "denied",
    ad_personalization: options.marketing ? "granted" : "denied",
  });
}

/**
 * Loads gtag.js once (client-only). Safe across SPA navigations.
 * Call only after statistics and/or marketing consent when IDs are configured.
 */
export function loadGoogleTag(ids: TrackingIds): void {
  if (typeof document === "undefined") return;
  const primaryId = ids.gaMeasurementId || ids.googleAdsId;
  if (!primaryId) return;

  warnMissingGoogleAdsConfig(ids);

  const scriptAlreadyPresent = Boolean(document.getElementById(GTAG_SCRIPT_ID));
  if (!scriptAlreadyPresent) {
    ensureGtagStub();
    const script = document.createElement("script");
    script.id = GTAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryId)}`;
    document.head.appendChild(script);
  }

  ensureGtagStub();

  if (!googleTagBootstrapped) {
    window.gtag?.("js", new Date());
    googleTagBootstrapped = true;
  }

  if (hasGaConfigured(ids) && !gaConfigApplied) {
    window.gtag?.("config", ids.gaMeasurementId, { anonymize_ip: true });
    gaConfigApplied = true;
  }
  if (ids.googleAdsId && !googleAdsConfigApplied) {
    window.gtag?.("config", ids.googleAdsId);
    googleAdsConfigApplied = true;
  }
}

export function loadMetaPixel(ids: TrackingIds): void {
  if (typeof document === "undefined" || !hasMetaConfigured(ids)) return;
  if (document.getElementById(META_SCRIPT_ID)) return;

  /* eslint-disable */
  (function (f: Window, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args);
      else n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.id = META_SCRIPT_ID;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s?.parentNode?.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  window.fbq?.("init", ids.metaPixelId);
  window.fbq?.("track", "PageView");
}

export function removeOptionalMarketingScripts(): void {
  if (typeof document !== "undefined") {
    document.getElementById(GTAG_SCRIPT_ID)?.remove();
    document.getElementById(META_SCRIPT_ID)?.remove();
  }
  googleTagBootstrapped = false;
  googleAdsConfigApplied = false;
  gaConfigApplied = false;
  // Keep gtag stub for consent updates if scripts are re-enabled later.
}

/**
 * Fires a Google Ads lead conversion exactly once per call.
 * Payload is only `send_to` — never form fields or other PII.
 * Returns true when the conversion event was dispatched.
 */
export function trackLeadConversion(ids: TrackingIds): boolean {
  if (typeof window === "undefined") return false;

  warnMissingGoogleAdsConfig(ids);

  if (!hasGoogleAdsConfigured(ids)) {
    if (import.meta.dev && !ids.googleAdsId && !ids.googleAdsConversionLabel) {
      // Both empty: expected until Vercel env is set — stay quiet.
    } else if (import.meta.dev) {
      // Partial config already warned via warnMissingGoogleAdsConfig.
    }
    return false;
  }

  if (typeof window.gtag !== "function") {
    if (import.meta.dev) {
      console.warn(
        "[analytics] Google Ads conversion skipped: gtag is not available yet (marketing consent / tag load required).",
      );
    }
    return false;
  }

  const sendTo = `${ids.googleAdsId}/${ids.googleAdsConversionLabel}`;
  window.gtag("event", "conversion", { send_to: sendTo });
  return true;
}

export function buildGoogleAdsSendTo(ids: TrackingIds): string | null {
  if (!hasGoogleAdsConfigured(ids)) return null;
  return `${ids.googleAdsId}/${ids.googleAdsConversionLabel}`;
}

export function dispatchPlatformEvent(
  name: AnalyticsEventName,
  props: AnalyticsEventProps,
  ids: TrackingIds,
  consent: { statistics: boolean; marketing: boolean },
): void {
  const safe = sanitizeAnalyticsProps(props);

  if (consent.statistics && hasGaConfigured(ids) && typeof window.gtag === "function") {
    window.gtag("event", name, safe);
  }

  if (consent.marketing && hasMetaConfigured(ids) && typeof window.fbq === "function") {
    const metaMap: Partial<Record<AnalyticsEventName, string>> = {
      contact_form_submit_success: "Lead",
      website_analysis_request: "Lead",
      cta_click: "CustomizeProduct",
    };
    const mapped = metaMap[name];
    if (mapped) window.fbq("track", mapped);
    else window.fbq("trackCustom", name, safe);
  }

  if (consent.marketing && LEAD_CONVERSION_EVENTS.has(name)) {
    trackLeadConversion(ids);
  }
}
