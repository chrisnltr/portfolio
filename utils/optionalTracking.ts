import type { AnalyticsEventName, AnalyticsEventProps, TrackingIds } from "~/types/analytics";
import {
  hasGaConfigured,
  hasGoogleAdsConfigured,
  hasMetaConfigured,
  sanitizeAnalyticsProps,
} from "~/utils/analyticsConfig";

const GTAG_SCRIPT_ID = "optional-gtag-js";
const META_SCRIPT_ID = "optional-meta-pixel";

function ensureGtagStub(): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
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

export function loadGoogleTag(ids: TrackingIds): void {
  if (typeof document === "undefined") return;
  const primaryId = ids.gaMeasurementId || ids.googleAdsId;
  if (!primaryId) return;
  if (document.getElementById(GTAG_SCRIPT_ID)) return;

  ensureGtagStub();
  const script = document.createElement("script");
  script.id = GTAG_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primaryId)}`;
  document.head.appendChild(script);

  window.gtag?.("js", new Date());
  if (hasGaConfigured(ids)) {
    window.gtag?.("config", ids.gaMeasurementId, { anonymize_ip: true });
  }
  if (ids.googleAdsId) {
    window.gtag?.("config", ids.googleAdsId);
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
  if (typeof document === "undefined") return;
  document.getElementById(GTAG_SCRIPT_ID)?.remove();
  document.getElementById(META_SCRIPT_ID)?.remove();
  // Keep gtag stub for consent updates if scripts are re-enabled later.
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

  if (
    consent.marketing &&
    hasGoogleAdsConfigured(ids) &&
    typeof window.gtag === "function" &&
    (name === "website_analysis_request" || name === "contact_form_submit_success")
  ) {
    window.gtag("event", "conversion", {
      send_to: `${ids.googleAdsId}/${ids.googleAdsConversionLabel}`,
      ...safe,
    });
  }
}
