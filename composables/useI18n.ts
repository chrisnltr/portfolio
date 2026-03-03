import { computed } from "vue";
import { useRoute, useRouter } from "#app";
import { en } from "~/data/i18n/en";
import { de } from "~/data/i18n/de";
import type { AppLocale, AppTranslations } from "~/types/i18n";

const SUPPORTED_LOCALES: AppLocale[] = ["en", "de"];
const DEFAULT_LOCALE: AppLocale = "en";

const translationsByLocale: Record<AppLocale, AppTranslations> = {
  en,
  de,
};

export const useI18n = () => {
  const route = useRoute();
  const router = useRouter();

  const locale = computed<AppLocale>(() => {
    const param = route.params.locale;
    if (typeof param === "string" && SUPPORTED_LOCALES.includes(param as AppLocale)) {
      return param as AppLocale;
    }
    return DEFAULT_LOCALE;
  });

  const messages = computed<AppTranslations>(() => {
    return translationsByLocale[locale.value];
  });

  const setLocale = async (newLocale: AppLocale) => {
    if (!SUPPORTED_LOCALES.includes(newLocale) || newLocale === locale.value) {
      if (process.client && SUPPORTED_LOCALES.includes(newLocale)) {
        localStorage.setItem("preferred_locale", newLocale);
      }
      return;
    }

    if (process.client) {
      localStorage.setItem("preferred_locale", newLocale);
    }

    await router.push({
      name: route.name as string | undefined,
      params: {
        ...route.params,
        locale: newLocale,
      },
      query: route.query,
      hash: route.hash,
    });
  };

  return {
    locale,
    messages,
    setLocale,
  };
};

