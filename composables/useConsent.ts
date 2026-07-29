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

let analyticsInjected = false;

async function injectVercelAnalytics(): Promise<void> {
  if (!import.meta.client || analyticsInjected) return;
  const { injectAnalytics } = await import("@vercel/analytics/nuxt/runtime");
  injectAnalytics();
  analyticsInjected = true;
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
    () => Boolean(consent.value && isConsentValid(consent.value) && consent.value.categories.statistics),
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
  }

  function persist(decision: ConsentDecisionInput, options?: { reloadIfNeeded?: boolean }): void {
    const previousStatistics = consent.value?.categories.statistics ?? false;
    const next = createConsentState(decision);
    consent.value = next;
    writeConsentCookie(next);
    bannerVisible.value = false;
    settingsOpen.value = false;

    if (next.categories.statistics) {
      void injectVercelAnalytics();
      return;
    }

    if (previousStatistics || analyticsInjected) {
      removeOptionalThirdPartyArtifacts();
      analyticsInjected = false;
      if (options?.reloadIfNeeded !== false && import.meta.client) {
        window.location.reload();
      }
    }
  }

  function acceptAll(): void {
    persist({ statistics: true });
  }

  function rejectAll(): void {
    persist({ statistics: false }, { reloadIfNeeded: true });
  }

  function savePreferences(input: ConsentDecisionInput): void {
    persist(input, { reloadIfNeeded: true });
  }

  function openSettings(trigger?: HTMLElement | null): void {
    settingsReturnFocus.value = trigger ?? (document.activeElement as HTMLElement | null);
    settingsOpen.value = true;
  }

  function closeSettings(): void {
    settingsOpen.value = false;
    const el = settingsReturnFocus.value;
    settingsReturnFocus.value = null;
    if (el && typeof el.focus === "function") {
      requestAnimationFrame(() => el.focus());
    }
  }

  function openBanner(): void {
    bannerVisible.value = true;
  }

  if (import.meta.client) {
    watch(
      hasStatisticsConsent,
      (allowed) => {
        if (allowed) void injectVercelAnalytics();
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
