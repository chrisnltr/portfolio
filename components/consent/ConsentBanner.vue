<template>
  <div
    v-if="bannerVisible"
    class="consent-banner fixed inset-0 z-[9000] flex items-center justify-center p-4 pointer-events-none"
    role="region"
    :aria-label="t.regionLabel"
  >
    <div
      class="pointer-events-auto w-full max-w-md rounded-xl border border-border-primary bg-background-secondary/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.45)] p-4 sm:p-5"
    >
      <h2 id="consent-banner-title" class="text-base sm:text-lg font-semibold text-text-primary mb-1.5">
        {{ t.title }}
      </h2>
      <p class="text-xs sm:text-sm text-text-secondary leading-relaxed mb-3">
        {{ t.description }}
      </p>

      <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm mb-4">
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

      <div class="flex flex-col gap-2">
        <button
          type="button"
          class="btn-primary w-full min-h-[40px] text-sm"
          @click="acceptAll"
        >
          {{ t.acceptAll }}
        </button>
        <button
          type="button"
          class="btn-secondary w-full min-h-[40px] text-sm"
          @click="rejectAll"
        >
          {{ t.rejectAll }}
        </button>
        <button
          type="button"
          class="btn-secondary w-full min-h-[40px] text-sm"
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
