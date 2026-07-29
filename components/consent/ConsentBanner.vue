<template>
  <div
    v-if="bannerVisible"
    class="consent-banner fixed inset-x-0 bottom-0 z-[9000] p-3 sm:p-4 md:p-6 pointer-events-none"
    role="region"
    :aria-label="t.regionLabel"
  >
    <div
      class="pointer-events-auto mx-auto max-w-3xl rounded-xl border border-border-primary bg-background-secondary/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.45)] p-4 sm:p-6"
    >
      <h2 id="consent-banner-title" class="text-lg sm:text-xl font-semibold text-text-primary mb-2">
        {{ t.title }}
      </h2>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed mb-4">
        {{ t.description }}
      </p>

      <div class="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-5">
        <NuxtLink
          :to="privacyLink"
          class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
        >
          {{ t.privacy }}
        </NuxtLink>
        <NuxtLink
          :to="imprintLink"
          class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded"
        >
          {{ t.imprint }}
        </NuxtLink>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          class="btn-primary flex-1 min-h-[44px] text-sm sm:text-base"
          @click="acceptAll"
        >
          {{ t.acceptAll }}
        </button>
        <button
          type="button"
          class="btn-secondary flex-1 min-h-[44px] text-sm sm:text-base"
          @click="rejectAll"
        >
          {{ t.rejectAll }}
        </button>
        <button
          type="button"
          class="btn-secondary flex-1 min-h-[44px] text-sm sm:text-base"
          @click="onOpenSettings"
        >
          {{ t.settings }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useConsent } from "~/composables/useConsent";
import { useI18n } from "~/composables/useI18n";

const { locale, messages } = useI18n();
const { bannerVisible, acceptAll, rejectAll, openSettings } = useConsent();

const t = computed(() => messages.value.consent.banner);

const privacyLink = computed(() =>
  locale.value === "de" ? "/de/datenschutz" : "/en/privacy",
);
const imprintLink = computed(() =>
  locale.value === "de" ? "/de/impressum" : "/en/imprint",
);

function onOpenSettings(event: MouseEvent) {
  openSettings(event.currentTarget as HTMLElement);
}
</script>
