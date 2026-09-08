import { computed } from "vue";
import { de } from "~/data/i18n/de";
import type { AppTranslations } from "~/types/i18n";

/**
 * Site content is German-only. Kept as useI18n for existing call sites.
 */
export const useI18n = () => {
  const locale = computed(() => "de" as const);
  const messages = computed<AppTranslations>(() => de);

  return {
    locale,
    messages,
  };
};
