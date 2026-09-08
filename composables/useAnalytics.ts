import { track as vercelTrack } from "@vercel/analytics";
import { useConsent } from "~/composables/useConsent";
import type { AnalyticsEventName, AnalyticsEventProps } from "~/types/analytics";
import { readTrackingIds, sanitizeAnalyticsProps } from "~/utils/analyticsConfig";
import { dispatchPlatformEvent } from "~/utils/optionalTracking";

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

  return { track };
}
