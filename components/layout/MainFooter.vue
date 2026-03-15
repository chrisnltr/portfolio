<template>
  <footer
    class="border-t border-border-primary py-6 mt-4"
    role="contentinfo"
    aria-label="Footer"
  >
    <div class="container mx-auto px-4 md:px-6">
      <div class="flex flex-wrap items-center justify-center text-sm text-text-secondary">
        <NuxtLink
          :to="privacyLink"
          class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary rounded"
        >
          {{ privacyLabel }}
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "~/composables/useI18n";

const { locale, messages } = useI18n();

const privacyLink = computed(() =>
  locale.value === "de" ? "/de/datenschutz" : "/en/privacy",
);
const privacyLabel = computed(() =>
  locale.value === "de" ? messages.value.footer.datenschutz : messages.value.footer.privacy,
);
</script>
