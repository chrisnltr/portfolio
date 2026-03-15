<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass-header">
    <div class="container mx-auto px-6 py-4">
      <nav
        class="flex items-center justify-between gap-4"
        aria-label="Legal page navigation"
      >
        <NuxtLink
          :to="homeLink"
          class="flex items-center gap-2 text-2xl md:text-3xl font-bold gradient-text cursor-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-md"
        >
          <span>CLN</span>
        </NuxtLink>
        <div class="flex items-center gap-4">
          <NuxtLink
            :to="homeLink"
            class="link text-sm md:text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded"
          >
            {{ backLabel }}
          </NuxtLink>
          <div class="flex items-center gap-2">
            <button
              v-for="loc in locales"
              :key="loc"
              type="button"
              class="px-2 py-1 rounded-full text-xs font-semibold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
              :class="
                locale === loc
                  ? 'bg-accent-600 text-white border-accent-600'
                  : 'bg-transparent text-text-secondary border-border-primary hover:border-accent-400'
              "
              :aria-pressed="locale === loc"
              :aria-label="loc === 'de' ? messages.nav.langSwitchDe : messages.nav.langSwitchEn"
              @click="onLocaleClick(loc)"
            >
              {{ loc.toUpperCase() }}
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import type { AppLocale } from "~/types/i18n";

const route = useRoute();
const { locale, messages, setLocale } = useI18n();

const locales: AppLocale[] = ["de", "en"];

const homeLink = computed(() => {
  const path = route.path;
  if (path.startsWith("/en")) {
    return "/en";
  }
  return "/de";
});

const backLabel = computed(() => {
  return homeLink.value === "/en" ? "Back to home" : "Zur Startseite";
});

const onLocaleClick = (target: AppLocale) => {
  setLocale(target);
};
</script>
