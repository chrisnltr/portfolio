<template>
  <div
    v-if="bannerVisible"
    class="consent-banner fixed inset-0 z-[9000] flex items-end sm:items-center justify-center p-4 bg-black/40"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="titleId"
    :aria-describedby="descId"
  >
    <div
      ref="panelRef"
      class="w-full max-w-md rounded-[var(--radius-md)] border border-border-primary bg-background-secondary p-4 sm:p-5"
      tabindex="-1"
      @keydown="onKeydown"
    >
      <h2 :id="titleId" class="text-base sm:text-lg font-semibold text-text-primary mb-1.5">
        {{ t.title }}
      </h2>
      <p :id="descId" class="text-xs sm:text-sm text-text-secondary leading-relaxed mb-3">
        {{ t.description }}
      </p>

      <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm mb-4">
        <NuxtLink
          :to="privacyLink"
          class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded min-h-[44px] inline-flex items-center"
        >
          {{ t.privacy }}
        </NuxtLink>
        <NuxtLink
          :to="imprintLink"
          class="link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded min-h-[44px] inline-flex items-center"
        >
          {{ t.imprint }}
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-2">
        <button
          ref="acceptRef"
          type="button"
          class="btn-primary w-full text-sm"
          @click="acceptAll"
        >
          {{ t.acceptAll }}
        </button>
        <button
          type="button"
          class="btn-secondary w-full text-sm"
          @click="rejectAll"
        >
          {{ t.rejectAll }}
        </button>
        <button
          type="button"
          class="btn-secondary w-full text-sm"
          @click="onOpenSettings"
        >
          {{ t.settings }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import { useConsent } from "~/composables/useConsent";
import { useI18n } from "~/composables/useI18n";

const titleId = "consent-banner-title";
const descId = "consent-banner-desc";

const { messages } = useI18n();
const { bannerVisible, acceptAll, rejectAll, openSettings } = useConsent();

const t = computed(() => messages.value.consent.banner);
const panelRef = ref<HTMLElement | null>(null);
const acceptRef = ref<HTMLButtonElement | null>(null);

const privacyLink = "/datenschutz";
const imprintLink = "/impressum";

function onOpenSettings(event: MouseEvent) {
  openSettings(event.currentTarget as HTMLElement);
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    openSettings(acceptRef.value);
  }
}

watch(bannerVisible, async (open) => {
  if (!open) return;
  await nextTick();
  acceptRef.value?.focus();
});
</script>
