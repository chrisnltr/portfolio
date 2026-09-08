import { computed, watch } from "vue";
import {
  createConsentState,
  getDefaultConsentCategories,
  isConsentValid,
  readConsentCookieFromDocument,
  removeOptionalThirdPartyArtifacts,
  writeConsentCookie,
} from "~/utils/consentStorage";
import type { ConsentDecisionInput, ConsentState } from "~/types/consent";
import { readTrackingIds, hasAnyOptionalTrackingConfigured, hasGaConfigured, hasGoogleAdsConfigured, hasMetaConfigured } from "~/utils/analyticsConfig";
import {
  initGoogleConsentDefaults,
  loadGoogleTag,
  loadMetaPixel,
  updateGoogleConsent,
} from "~/utils/optionalTracking";

let analyticsInjected = false;
let googleDefaultsInitialized = false;
let optionalScriptsInjected = false;

async function injectVercelAnalytics(): Promise<void> {
  if (!import.meta.client || analyticsInjected) return;
  const { injectAnalytics } = await import("@vercel/analytics/nuxt/runtime");
  injectAnalytics();
  analyticsInjected = true;
}

function getIds() {
  const config = useRuntimeConfig();
  return readTrackingIds(config.public);
}

function syncOptionalTracking(categories: {
  statistics: boolean;
  marketing: boolean;
}): void {
  if (!import.meta.client) return;
  const ids = getIds();

  if (hasAnyOptionalTrackingConfigured(ids) && !googleDefaultsInitialized) {
    if (hasGaConfigured(ids) || hasGoogleAdsConfigured(ids) || ids.googleAdsId) {
      initGoogleConsentDefaults();
      googleDefaultsInitialized = true;
    }
  }

  const needsGtag =
    (categories.statistics && hasGaConfigured(ids)) ||
    (categories.marketing && (hasGoogleAdsConfigured(ids) || Boolean(ids.googleAdsId)));
  const needsMeta = categories.marketing && hasMetaConfigured(ids);

  if (needsGtag || needsMeta) {
    if (googleDefaultsInitialized || hasGaConfigured(ids) || ids.googleAdsId) {
      if (!googleDefaultsInitialized && (hasGaConfigured(ids) || ids.googleAdsId)) {
        initGoogleConsentDefaults();
        googleDefaultsInitialized = true;
      }
      updateGoogleConsent({
        statistics: categories.statistics,
        marketing: categories.marketing,
      });
    }
    if (needsGtag) loadGoogleTag(ids);
    if (needsMeta) loadMetaPixel(ids);
    optionalScriptsInjected = true;
    return;
  }

  if (optionalScriptsInjected || googleDefaultsInitialized) {
    updateGoogleConsent({ statistics: false, marketing: false });
  }
}

export function useConsent() {
  const consent = useState<ConsentState | null>("portfolio-consent", () => null);
  const hydrated = useState<boolean>("portfolio-consent-hydrated", () => false);
  const bannerVisible = useState<boolean>("portfolio-consent-banner", () => false);
  const settingsOpen = useState<boolean>("portfolio-consent-settings", () => false);
  const settingsReturnFocus = useState<HTMLElement | null>(
    "portfolio-consent-settings-focus",
    () => null,
  );

  const categories = computed(() =>
    consent.value?.categories ?? getDefaultConsentCategories(),
  );

  const hasStatisticsConsent = computed(
    () =>
      Boolean(
        consent.value &&
          isConsentValid(consent.value) &&
          consent.value.categories.statistics,
      ),
  );

  const hasMarketingConsent = computed(
    () =>
      Boolean(
        consent.value &&
          isConsentValid(consent.value) &&
          consent.value.categories.marketing,
      ),
  );

  const hasDecided = computed(() => isConsentValid(consent.value));

  function hydrateFromCookie(): void {
    if (!import.meta.client) return;
    const stored = readConsentCookieFromDocument();
    consent.value = stored;
    hydrated.value = true;
    bannerVisible.value = !isConsentValid(stored);
    if (stored?.categories.statistics) {
      void injectVercelAnalytics();
    }
    if (stored) {
      syncOptionalTracking(stored.categories);
    }
  }

  function persist(
    decision: ConsentDecisionInput,
    options?: { reloadIfNeeded?: boolean },
  ): void {
    const previousStatistics = consent.value?.categories.statistics ?? false;
    const previousMarketing = consent.value?.categories.marketing ?? false;
    const next = createConsentState(decision);
    consent.value = next;
    writeConsentCookie(next);
    bannerVisible.value = false;
    settingsOpen.value = false;

    if (next.categories.statistics) {
      void injectVercelAnalytics();
    }

    syncOptionalTracking(next.categories);

    const disabledOptional =
      (previousStatistics && !next.categories.statistics) ||
      (previousMarketing && !next.categories.marketing);

    if (disabledOptional || (!next.categories.statistics && analyticsInjected)) {
      if (!next.categories.statistics && !next.categories.marketing) {
        removeOptionalThirdPartyArtifacts();
        analyticsInjected = false;
        optionalScriptsInjected = false;
        if (options?.reloadIfNeeded !== false && import.meta.client) {
          window.location.reload();
        }
      } else if (!next.categories.statistics && analyticsInjected) {
        removeOptionalThirdPartyArtifacts();
        analyticsInjected = false;
        optionalScriptsInjected = false;
        if (options?.reloadIfNeeded !== false && import.meta.client) {
          window.location.reload();
        }
      }
    }
  }

  function acceptAll(): void {
    persist({ statistics: true, marketing: true });
  }

  function rejectAll(): void {
    persist({ statistics: false, marketing: false }, { reloadIfNeeded: true });
  }

  function savePreferences(input: ConsentDecisionInput): void {
    persist(input, { reloadIfNeeded: true });
  }

  function openSettings(trigger?: HTMLElement | null): void {
    settingsReturnFocus.value =
      trigger ?? (document.activeElement as HTMLElement | null);
    settingsOpen.value = true;
  }

  function closeSettings(): void {
    settingsOpen.value = false;
    const el = settingsReturnFocus.value;
    settingsReturnFocus.value = null;
    if (el && typeof el.focus === "function") {
      requestAnimationFrame(() => {
        try {
          el.focus({ preventScroll: true });
        } catch {
          el.focus();
        }
      });
    }
  }

  function openBanner(): void {
    bannerVisible.value = true;
  }

  if (import.meta.client) {
    watch(
      [hasStatisticsConsent, hasMarketingConsent],
      ([stats, marketing]) => {
        if (stats) void injectVercelAnalytics();
        syncOptionalTracking({ statistics: stats, marketing });
      },
      { immediate: false },
    );
  }

  return {
    consent,
    hydrated,
    bannerVisible,
    settingsOpen,
    categories,
    hasStatisticsConsent,
    hasMarketingConsent,
    hasDecided,
    hydrateFromCookie,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
    openBanner,
  };
}
