<template>
  <footer
    class="border-t border-border-primary py-6 mt-4"
    role="contentinfo"
    aria-label="Footer"
  >
    <div class="container mx-auto px-4 md:px-6">
      <div
        class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-text-secondary"
      >
        <NuxtLink
          :to="privacyLink"
          class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary rounded"
        >
          {{ privacyLabel }}
        </NuxtLink>
        <NuxtLink
          :to="imprintLink"
          class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary rounded"
        >
          {{ imprintLabel }}
        </NuxtLink>
        <button
          type="button"
          class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary rounded bg-transparent border-0 p-0 cursor-pointer text-sm text-text-secondary"
          @click="onOpenConsent"
        >
          {{ messages.footer.consentSettings }}
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";
import { useConsent } from "~/composables/useConsent";

const { locale, messages } = useI18n();
const { openSettings } = useConsent();

const privacyLink = computed(() =>
  locale.value === "de" ? "/de/datenschutz" : "/en/privacy",
);
const privacyLabel = computed(() =>
  locale.value === "de" ? messages.value.footer.datenschutz : messages.value.footer.privacy,
);

const imprintLink = computed(() =>
  locale.value === "de" ? "/de/impressum" : "/en/imprint",
);
const imprintLabel = computed(() =>
  locale.value === "de" ? messages.value.footer.impressum : messages.value.footer.imprint,
);

function onOpenConsent(event: MouseEvent) {
  openSettings(event.currentTarget as HTMLElement);
}
</script>
