import { track as vercelTrack } from "@vercel/analytics";
import { useConsent } from "~/composables/useConsent";
import type { AnalyticsEventName, AnalyticsEventProps } from "~/types/analytics";
import { readTrackingIds, sanitizeAnalyticsProps } from "~/utils/analyticsConfig";
import { readMarketingAttribution } from "~/utils/marketingAttribution";
import {
  dispatchPlatformEvent,
  trackLeadConversion as dispatchLeadConversion,
} from "~/utils/optionalTracking";

/** Events that may carry first-touch Ads/UTM attribution (no PII). */
const ATTRIBUTION_EVENTS: ReadonlySet<AnalyticsEventName> = new Set([
  "website_landing_view",
  "website_cta_click",
  "contact_funnel_start",
  "contact_form_submit_success",
]);

/**
 * Central typed analytics interface.
 * No-ops when consent is missing or optional platform IDs are unset.
 * Never sends message text, emails, or phone numbers.
 */
export function useAnalytics() {
  const { hasStatisticsConsent, hasMarketingConsent } = useConsent();
  const route = useRoute();
  const config = useRuntimeConfig();

  function resolveLanguage(): string {
    return "de";
  }

  function track(name: AnalyticsEventName, props: AnalyticsEventProps = {}): void {
    if (!import.meta.client) return;

    const statistics = hasStatisticsConsent.value;
    const marketing = hasMarketingConsent.value;
    if (!statistics && !marketing) return;

    const enriched: AnalyticsEventProps = {
      page: props.page ?? route.path,
      language: props.language ?? resolveLanguage(),
      ...props,
    };

    if (marketing && ATTRIBUTION_EVENTS.has(name)) {
      const attribution = readMarketingAttribution();
      for (const [key, value] of Object.entries(attribution)) {
        if (value && enriched[key as keyof AnalyticsEventProps] == null) {
          (enriched as Record<string, string | number | boolean>)[key] = value;
        }
      }
    }

    const safe = sanitizeAnalyticsProps(enriched);
    const ids = readTrackingIds(config.public);

    if (statistics) {
      try {
        void vercelTrack(name, safe);
      } catch {
        // Analytics must never break the user flow.
      }
    }

    try {
      dispatchPlatformEvent(name, enriched, ids, { statistics, marketing });
    } catch {
      // Optional platforms must never break the user flow.
    }
  }

  /**
   * Google Ads lead conversion after a successful server-accepted inquiry.
   * Requires marketing consent and configured Ads ID + conversion label.
   * Sends only `{ send_to }` — never form PII.
   */
  function trackLeadConversion(): boolean {
    if (!import.meta.client) return false;
    if (!hasMarketingConsent.value) return false;

    const ids = readTrackingIds(config.public);
    try {
      return dispatchLeadConversion(ids);
    } catch {
      return false;
    }
  }

  return { track, trackLeadConversion };
}
