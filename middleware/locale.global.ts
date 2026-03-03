import type { AppLocale } from "~/types/i18n";

const SUPPORTED_LOCALES: AppLocale[] = ["en", "de"];
const DEFAULT_LOCALE: AppLocale = "en";

const getPreferredLocale = (): AppLocale => {
  if (process.client) {
    const stored = window.localStorage.getItem("preferred_locale") as AppLocale | null;
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      return stored;
    }

    const browser = window.navigator.language?.slice(0, 2).toLowerCase();
    if (browser === "de") {
      return "de";
    }
  }

  return DEFAULT_LOCALE;
};

export default defineNuxtRouteMiddleware((to) => {
  const localeParam = to.params.locale as string | undefined;

  // Handle root path without locale explicitly (e.g. "/")
  if (!localeParam && to.path === "/") {
    const preferred = getPreferredLocale();
    return navigateTo(`/${preferred}`);
  }

  if (!localeParam) {
    return;
  }

  if (!SUPPORTED_LOCALES.includes(localeParam as AppLocale)) {
    return navigateTo({
      ...to,
      params: {
        ...to.params,
        locale: DEFAULT_LOCALE,
      },
    });
  }
});

