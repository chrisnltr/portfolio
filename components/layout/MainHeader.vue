<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass-header">
    <div class="container mx-auto px-6 py-4">
      <nav
        class="flex items-center justify-between gap-4"
        :aria-label="messages.nav.ariaLabel"
      >
        <a
          href="#home"
          class="flex items-center gap-2 text-2xl md:text-3xl font-bold gradient-text cursor-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-md"
        >
          <span>CLN</span>
        </a>

        <div class="hidden md:flex items-center gap-8">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="link cursor-glow text-sm md:text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded"
          >
            {{ item.label }}
          </a>

          <div class="flex items-center gap-2 ml-4">
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

        <button
          type="button"
          class="md:hidden btn-ghost focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          @click="toggleMobileMenu"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-nav"
          :aria-label="messages.nav.menuToggle"
        >
          <svg
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </nav>

      <div
        v-if="mobileMenuOpen"
        id="mobile-nav"
        class="md:hidden mt-4 pb-4 border-t border-border-primary"
      >
        <div class="flex flex-col space-y-4 pt-4">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            class="link cursor-glow text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded block py-1"
            @click="closeMobileMenu"
          >
            {{ item.label }}
          </a>

          <div class="flex items-center gap-2 pt-2">
            <button
              v-for="loc in locales"
              :key="loc"
              type="button"
              class="px-3 py-1 rounded-full text-xs font-semibold border transition-colors flex-1 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
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
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "~/composables/useI18n";
import type { AppLocale } from "~/types/i18n";

const mobileMenuOpen = ref(false);

const { locale: currentLocale, messages, setLocale } = useI18n();

const locale = computed(() => currentLocale.value);

const locales: AppLocale[] = ["de", "en"];

const navItems = computed(() => {
  const m = messages.value;
  return [
    { id: "home", label: m.nav.home },
    { id: "about", label: m.nav.about },
    { id: "experience", label: m.nav.experience },
    { id: "projects", label: m.nav.projects },
    { id: "contact", label: m.nav.contact },
  ];
});

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

const onLocaleClick = (target: AppLocale) => {
  setLocale(target);
};
</script>

